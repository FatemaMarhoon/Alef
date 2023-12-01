'use client'
import { useState, useEffect, ChangeEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getApplicationById, updateApplication } from "@/services/applicationsService";
import { getGuardianTypes } from "@/services/staticValuesService";
import { useRouter } from "next/navigation";
import { StaticValue } from "@/types/staticValue";
import { getGrades } from "@/services/gradeCapacityService";
import { Application } from "@/types/application";
import { ApplicationPOST } from "@/types/applicationPOST";
import { useSuccessMessageContext } from "@/components/SuccessMessageContext";
import ErrorAlert from "@/components/ErrorAlert";

export default function EditApplicationForm({ params }: { params: { id: number } }) {
    const router = useRouter();
    const [application, setApplication] = useState<Application | null>(null);
    const [guardianTypes, setGuardianTypes] = useState<StaticValue[]>([]);
    const [grades, setGrades] = useState<string[]>([]);
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");
    //updated values storage 
    const [email, setEmail] = useState("");
    const [guardianType, setGuardianType] = useState("");
    const [studentName, setStudentName] = useState("");
    const [gender, setGender] = useState("");
    const [grade, setGrade] = useState("");
    const [studentCPR, setStudentCPR] = useState("");
    const [guardianName, setGuardianName] = useState("");
    const [phone, setPhone] = useState("");
    const [studentDOB, setStudentDOB] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const [status, setStatus] = useState("");
    const [personalPicture, setPersonalPicture] = useState<File | undefined>(undefined);
    const [passport, setPassport] = useState<File | undefined>(undefined);
    const [certificateOfBirth, setCertificateOfBirth] = useState<File | undefined>(undefined);

    useEffect(() => {
        async function fetchGuardianTypes() {
            try {
                const types = await getGuardianTypes();
                setGuardianTypes(types);
            } catch (error) {
                console.error("Error fetching guardian types:", error);
            }
        }

        async function fetchGrades() {
            try {
                const gradesData = await getGrades();
                // Extract only the 'grade' values from the array of gradeCapacity
                const grades = gradesData.map((gradeData) => gradeData.grade);
                setGrades(grades);
            } catch (error) {
                console.error("Error fetching grades: ", error);
            }
        }

        fetchGuardianTypes();
        fetchGrades();

    }, []);

    useEffect(() => {
        // Fetch application data when the component mounts
        const fetchApplicationData = async () => {
            try {
                const existingApplication = await getApplicationById(params.id);
                setApplication(existingApplication);
            } catch (error) {
                console.error('Error fetching application data:', error);
            }
        };
        fetchApplicationData();
    }, [params.id]);


    // Update the handleFileChange function
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | undefined>>) => {
        const file = e.target.files?.[0];
        setFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (application) {
                const applicationID = params.id;
                const response = await updateApplication(
                    {
                        id: applicationID,
                        email: email,
                        guardian_type: guardianType,
                        student_name: studentName,
                        student_CPR: Number(studentCPR),
                        gender: gender,
                        grade: grade,
                        guardian_name: guardianName,
                        phone: phone,
                        student_DOB: studentDOB ? new Date(studentDOB) : undefined,
                        medical_history: medicalHistory,
                        personal_picture: personalPicture,
                        certificate_of_birth: certificateOfBirth,
                        passport: passport,
                        status: status
                    });
                if (response.status == 200 || response.status == 201) {
                    setSuccessMessage(response.data.message);
                    router.push("/applications"); // Redirect to the applications page after submission
                }
                else if (response.status == 400 || response.status == 404 || response.status == 500) {
                    setError(response.data.message);
                }
            }
            } catch (error: any) {
                if (error.response) {
                    setError(error.response.data.message);
                }
                else if (error.message) {
                    setError(error.message);
                }
            }
        
        };
        // const handleSubmit = async (e: React.FormEvent) => {
        //     e.preventDefault();

        //     try {
        //         console.log(" in submit function: ", studentDOB)
        //         if (application){
        //             const applicationID = params.id;
        //             const userId = application.created_by
        //             const response = await updateApplication(
        //                 applicationID,
        //                 email,
        //                 guardianType,
        //                 studentName,
        //                 Number(studentCPR),
        //                 gender,
        //                 grade,
        //                 guardianName,
        //                 phone,
        //                 studentDOB ? new Date(studentDOB) : undefined,
        //                 medicalHistory,
        //                 personalPicture,
        //                 certificateOfBirth,
        //                 passport,
        //                 userId,
        //                 status
        //             );
        //             router.push("/applications"); // Redirect to the applications page after submission
        //         }
        //     } catch (error) {
        //         // Handle error
        //         console.error("Error updating application:", error);
        //     }
        // };

        return (
            <>
                <Breadcrumb pageName="Edit Application" />
                {error && <ErrorAlert message={error}></ErrorAlert>}

                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        {/* FORM STARTS HERE */}
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Edit Application
                                </h3>
                            </div>
                            <form action="#" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="p-6.5">
                                    {/* Student Name */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Student Name <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="student_name"
                                            value={application?.student_name}
                                            onChange={(e) => setStudentName(e.target.value)}
                                            placeholder="Enter student's name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                       
                                    </div>

                                    {/* Student CPR */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Student CPR <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={application?.student_CPR}
                                            onChange={(e) => setStudentCPR(e.target.value)}
                                            placeholder="Enter student's CPR"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Student Date of Birth */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Student Date of Birth <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={application?.student_DOB.toString()}
                                            onChange={(e) => setStudentDOB(e.target.value)}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="mb-4.5">
                                        <label className="block text-black dark:text-white">
                                            Gender <span className="text-meta-1">*</span>
                                        </label>
                                        <div className="flex">
                                            <div className="mr-6">
                                                <input
                                                    type="radio"
                                                    id="male"
                                                    name="gender"
                                                    value="Male"
                                                    checked={application?.gender === "Male"}
                                                    onChange={() => setGender("Male")}
                                                />
                                                <label className="ml-2" htmlFor="male">
                                                    Male
                                                </label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="female"
                                                    name="gender"
                                                    value="Female"
                                                    checked={application?.gender === "Female"}
                                                    onChange={() => setGender("Female")}
                                                />
                                                <label className="ml-2" htmlFor="female">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Student Grade */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Grade <span className="text-meta-1">*</span>
                                        </label>
                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={application?.grade}
                                                onChange={(e) => setGrade(e.target.value)}
                                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            >
                                                <option value="">Select grade</option>
                                                {grades.map((gradeValue, index) => (
                                                    <option key={index} value={gradeValue}>
                                                        {gradeValue}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                <svg
                                                    className="fill-current"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill=""
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Guardian Name */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Guardian Name <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={application?.guardian_name}
                                            onChange={(e) => setGuardianName(e.target.value)}
                                            placeholder="Enter guardian's name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Guardian Type */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Guardian Type <span className="text-meta-1">*</span>
                                        </label>
                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={application?.guardian_type}
                                                onChange={(e) => setGuardianType(e.target.value)}
                                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            >
                                                <option value="">Select guardian type</option>
                                                {guardianTypes.map((type, index) => (
                                                    <option key={index} value={type.ValueName}>
                                                        {type.ValueName}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                <svg
                                                    className="fill-current"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill=""
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Phone <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={application?.phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter contact phone number"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Email <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={application?.email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter contact email address"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Medical History */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Medical History
                                        </label>
                                        <textarea
                                            value={application?.medical_history}
                                            onChange={(e) => setMedicalHistory(e.target.value)}
                                            placeholder="Please provide detials of any medical condition or long term illness that the student has."
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Personal Picture */}
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-black dark:text-white">
                                            Personal Picture <span className="text-meta-1">*</span>
                                        </label>
                                        <label>{application?.personal_picture}</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(e, setPersonalPicture)}
                                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Certificate of Birth */}
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-black dark:text-white">
                                            Certificate of Birth <span className="text-meta-1">*</span>
                                        </label>
                                        <label>{application?.certificate_of_birth}</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(e, setCertificateOfBirth)}
                                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Passport */}
                                    <div className="mb-4.5">
                                        <label className="mb-3 block text-black dark:text-white">
                                            Passport <span className="text-meta-1">*</span>
                                        </label>
                                        <label>{application?.passport}</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(e, setPassport)}
                                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                        />
                                    </div>


                                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    };

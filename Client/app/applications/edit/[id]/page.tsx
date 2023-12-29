'use client'
import { useState, useEffect, ChangeEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getApplicationById, updateApplication } from "@/services/applicationsService";
import { getGuardianTypes } from "@/services/staticValuesService";
import { useRouter } from "next/navigation";
import { StaticValue } from "@/types/staticValue";
import { getGrades } from "@/services/gradeCapacityService";
import { Application } from "@/types/application";
import { useSuccessMessageContext } from "@/components/SuccessMessageContext";
import ErrorAlert from "@/components/ErrorAlert";
import { ApplicationPOST } from "@/types/applicationPOST";
import Link from "next/link";
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';


export default function EditApplicationForm({ params }: { params: { id: number } }) {
    const router = useRouter();
    const [application, setApplication] = useState<Application | null>(null);
    const [updated, setUpdated] = useState<ApplicationPOST>({});
    const [guardianTypes, setGuardianTypes] = useState<StaticValue[]>([]);
    const [grades, setGrades] = useState<string[]>([]);
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");


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
                setUpdated({student_name:existingApplication.student_name,
                    student_DOB:new Date(existingApplication.student_DOB).toISOString().slice(0, 10),
                    student_CPR:existingApplication.student_CPR,
                    gender:existingApplication.gender,
                    grade:existingApplication.grade,
                    guardian_name:existingApplication.guardian_name,
                    guardian_type:existingApplication.guardian_type,
                    status:existingApplication.status,
                    phone:existingApplication.phone,
                    email:existingApplication.email,
                    medical_history:existingApplication.medical_history
                })
            } catch (error) {
                console.error('Error fetching application data:', error);
            }
        };
        fetchApplicationData();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (application) {
                const applicationID = params.id;
                const response = await updateApplication(applicationID, updated);
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

    return (
        <>
            <Breadcrumbs previousName='Applications' currentName='Edit' pageTitle="Edit Application" previousPath='/applications' />
            {error && <ErrorAlert message={error}></ErrorAlert>}

            <div className="grid grid-cols-12 sm:grid-cols-2">
            <div className="col-span-12">
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
                                        value={updated.student_name}
                                        onChange={(e) => setUpdated({ ...updated, student_name: e.target.value })}
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
                                        name="student_CPR"
                                        value={updated.student_CPR}
                                        onChange={(e) => setUpdated({ ...updated, student_CPR: Number(e.target.value) })}
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
                                        name="student_DOB"
                                        value={updated.student_DOB}
                                        onChange={(e) => setUpdated({ ...updated, student_DOB: e.target.value })}
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
                                                checked={updated.gender === "Male"}
                                                onChange={(e) => setUpdated({ ...updated, gender: e.target.value })}
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
                                                checked={updated.gender === "Female"}
                                                onChange={(e) => setUpdated({ ...updated, gender: e.target.value })}
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
                                            value={updated.grade}
                                            name="grade"
                                            onChange={(e) => setUpdated({ ...updated, grade: e.target.value })}
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
                                        name="guardian_name"
                                        value={updated.guardian_name}
                                        onChange={(e) => setUpdated({ ...updated, guardian_name: e.target.value })}
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
                                            name="guardian_type"
                                            value={updated.guardian_type}
                                            onChange={(e) => setUpdated({ ...updated, guardian_type: e.target.value })}
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
                                        name="phone"
                                        value={updated.phone}
                                        onChange={(e) => setUpdated({ ...updated, phone: e.target.value })}
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
                                        name="email"
                                        value={updated.email}
                                        onChange={(e) => setUpdated({ ...updated, email: e.target.value })}
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
                                        name="medical_history"
                                        value={updated.medical_history}
                                        onChange={(e) => setUpdated({ ...updated, medical_history: e.target.value })}
                                        placeholder="Please provide detials of any medical condition or long term illness that the student has."
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                {/* Personal Picture */}
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Personal Picture <span className="text-meta-1">*</span>
                                    </label>
                                    <Link className="text-secondary" href={`${application?.personal_picture}`} target="_blank"><p>View Existing File</p></Link>
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        name="personal_picture"
                                        onChange={(e) => setUpdated({ ...updated, personal_picture: e.target.files?.[0] })}
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Certificate of Birth */}
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Certificate of Birth <span className="text-meta-1">*</span>
                                    </label>
                                    <Link className="text-secondary" href={`${application?.certificate_of_birth}`} target="_blank"><p>View Existing File</p></Link>
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        name="certificate_of_birth"
                                        onChange={(e) => setUpdated({ ...updated, certificate_of_birth: e.target.files?.[0] })}
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Passport */}
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Passport <span className="text-meta-1">*</span>
                                    </label>
                                    <Link className="text-secondary" href={`${application?.passport}`} target="_blank"><p>View Existing File</p></Link>
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        name="passport"
                                        onChange={(e) => setUpdated({ ...updated, passport: e.target.files?.[0] })}
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

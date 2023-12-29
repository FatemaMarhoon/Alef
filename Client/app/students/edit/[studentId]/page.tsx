
'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb2";
import { getStudentById, updateStudent } from '@/services/studentService';
import { UserStorage } from "@/types/user";
import { Student } from '@/types/student';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import ErrorAlert from "@/components/ErrorAlert";
import { getGrades } from '@/services/gradeCapacityService';
import { GradeCapacity } from '@/types/gradeCapacity';
import { StaticValue } from "@/types/staticValue";
import { getGender } from "@/services/staticValuesService";
import Link from "next/link";
import Loader from "@/components/common/Loader"; // Import the Loader component

export default function EditForm({ params }: { params: { studentId: number } }) {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");
    // const [newGender, setNewGender] = useState("");
    const [loading, setLoading] = useState(true); // Added loading state

    const [student, setStudent] = useState<Student>({});
    const [gradesList, setGradesList] = useState<GradeCapacity[]>([]);
    const [genderTypes, setGenderTypes] = useState<StaticValue[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [personalPicture, setPersonalPicture] = useState<File | undefined>(undefined);
    const [passport, setPassport] = useState<File | undefined>(undefined);
    const [certificateOfBirth, setCertificateOfBirth] = useState<File | undefined>(undefined);
    useEffect(() => {
        // Fetch the existing student data when the component mounts
        const fetchStudentData = async () => {
            try {
                const existingStudent = await getStudentById(params.studentId.toString());
                setStudent(existingStudent);
                setLoading(false); // Set loading to false once data is fetched

            } catch (error) {
                console.error("Error fetching student data:", error);
                setLoading(false); // Set loading to false once data is fetched

            }
        };

        fetchStudentData();
    }, [params.studentId]);

    useEffect(() => {
        // Fetch gender types when the component mounts
        async function fetchGender() {
            try {
                const types = await getGender();
                setGenderTypes(types);
                console.log(types);
            } catch (error) {
                console.error("Error fetching guardian types:", error);
            }
        }
        fetchGender();
    }, []);
    const focusOnFirstError = (errors: Record<string, string>) => {
        // Get the first input field name with an error
        const firstErrorField = Object.keys(errors)[0];

        // Find the corresponding input element
        const errorFieldElement = document.querySelector(`[name="${firstErrorField}"]`) as HTMLInputElement | null;

        // Focus on the input element if found
        if (errorFieldElement) {
            errorFieldElement.focus();
        }
    };
    // Update the handleFileChange function
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | undefined>>) => {
        const file = e.target.files?.[0];
        setFile(file);
    };
    useEffect(() => {
        async function fetchGradesList() {
            try {
                const response = await getGrades();
                console.log('Grade List Response:', response);

                // Log the response.data or the actual array
                console.log('Grade List Data:', response || response);

                setGradesList(response || []);
                // Set loading to false after fetching data (if needed)
            } catch (error) {
                console.error("Error fetching staff list:", error);
                setGradesList([]);
                // Set loading to false in case of an error (if needed)
            }
        }

        fetchGradesList();
    }, []); // Empty
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Send the request and log the response
            const response = await updateStudent(params.studentId.toString(), student);
            console.log('API Response:', response);
            console.log('API Response:', response);
            // Check if response is defined and has data
            if (response && response.data) {
                const successMsg = response.data.message;

                // Check the status after ensuring response and data are defined
                if (response.status === 200 || response.status === 201) {
                    setSuccessMessage(successMsg);
                } else if (response.status == 400 || response.status == 404 || response.status == 500) {
                    setError(response.data.message);
                }
            }
            // Redirect after successful submission
            router.push('/students');
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
            {loading && <Loader />} {/* Show loading indicator */}

            <Breadcrumbs previousName='Students' currentName='Edit' pageTitle="Edit Student" previousPath='/students' />
            {error && <ErrorAlert message={error}></ErrorAlert>}

            <div className=" items-center justify-center min-h-screen">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Edit Student
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Student Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={student.student_name}
                                        onChange={(e) => setStudent({ ...student, student_name: e.target.value })}
                                        placeholder="Enter student's name"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.student_name ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.student_name && (
                                        <p className="text-error text-sm mt-1">{errors.student_name}</p>
                                    )}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Date of Birth <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={student.DOB ? new Date(student.DOB).toISOString().substring(0, 10) : ''}
                                        onChange={(e) => setStudent({ ...student, DOB: new Date(e.target.value) })}
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.DOB ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.DOB && (
                                        <p className="text-error text-sm mt-1">{errors.DOB}</p>
                                    )}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">Gender:</label>
                                    <select
                                        value={student.gender}
                                        onChange={
                                            (e) => {
                                                setStudent({ ...student, gender: (e.target.value) })
                                                // setNewGender(e.target.value);
                                            }
                                        }
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                                    >
                                        <option value="">Select Gender</option>
                                        {genderTypes.map((genderValue, index) => (
                                            <option key={index} value={genderValue.ValueName}>
                                                {genderValue.ValueName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Grade <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        name="grade"
                                        value={student.grade}
                                        onChange={(e) => setStudent({ ...student, grade: (e.target.value) })}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    >
                                        <option value="">Select Grade</option>
                                        {gradesList.map((grade, optionIndex) => (
                                            <option key={optionIndex} value={grade.grade}>
                                                {grade.grade}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        CPR <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={student.CPR}
                                        onChange={(e) => setStudent({ ...student, CPR: parseInt(e.target.value) })}
                                        placeholder="Enter student's CPR"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.CPR ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.CPR && (
                                        <p className="text-error text-sm mt-1">{errors.CPR}</p>
                                    )}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contact Number 1<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={student.contact_number1}
                                        onChange={(e) => setStudent({ ...student, contact_number1: parseInt(e.target.value) })} placeholder="Enter student's Contact Number"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.contact_number1 ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.contact_number1 && (
                                        <p className="text-error text-sm mt-1">{errors.contact_number1}</p>
                                    )}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contact Number 2<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={student.contact_number2}
                                        onChange={(e) => setStudent({ ...student, contact_number2: parseInt(e.target.value) })} placeholder="Enter student's Contact Number"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.contact_number2 ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.contact_number2 && (
                                        <p className="text-error text-sm mt-1">{errors.contact_number2}</p>
                                    )}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Guardian Name<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={student.guardian_name}
                                        onChange={(e) => setStudent({ ...student, guardian_name: e.target.value })}
                                        placeholder="Enter student's Guardian Name"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.guardian_name ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.guardian_name && (
                                        <p className="text-error text-sm mt-1">{errors.guardian_name}</p>
                                    )}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Enrollment Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={student.enrollment_date ? new Date(student.enrollment_date).toISOString().substring(0, 10) : ''}
                                        onChange={(e) => setStudent({ ...student, enrollment_date: new Date(e.target.value) })}
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.enrollment_date ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.enrollment_date && (
                                        <p className="text-error text-sm mt-1">{errors.enrollment_date}</p>
                                    )}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Medical History <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={student.medical_history}
                                        onChange={(e) => setStudent({ ...student, medical_history: e.target.value })}
                                        placeholder="Enter student's medical history"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.medical_history ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.medical_history && (
                                        <p className="text-error text-sm mt-1">{errors.medical_history}</p>
                                    )}
                                </div>
                                {/* Personal Picture */}
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Personal Picture <span className="text-meta-1">*</span>
                                    </label>
                                    <Link className="text-secondary" href={`${student?.personal_picture}`} target="_blank"><p>View Existing File</p></Link>

                                    {/* <label>{student?.personal_picture}</label> */}
                                    <input
                                        type="file"
                                        name="personal_picture"
                                        accept="image/*,application/pdf"
                                        onChange={(e) => setStudent({ ...student, personal_pictureFile: e.target.files?.[0] })}
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Certificate of Birth */}
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Certificate of Birth <span className="text-meta-1">*</span>
                                    </label>
                                    <Link className="text-secondary" href={`${student?.certificate_of_birth}`} target="_blank"><p>View Existing File</p></Link>
                                    <input
                                        type="file"
                                        name="certificate_of_birth"
                                        accept="image/*,application/pdf"
                                        onChange={(e) => setStudent({ ...student, certificate_of_birthFile: e.target.files?.[0] })}
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Passport */}
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Passport <span className="text-meta-1">*</span>
                                    </label>
                                    <Link className="text-secondary" href={`${student?.passport}`} target="_blank"><p>View Existing File</p></Link>

                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        name="passport"
                                        onChange={(e) => setStudent({ ...student, passportFile: e.target.files?.[0] })}
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mb-4">
                                    Update
                                </button>
                                <Link
                                    href="/students"
                                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"              >
                                    Back To List
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

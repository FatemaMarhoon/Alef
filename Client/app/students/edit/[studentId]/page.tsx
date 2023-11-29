
'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getStudentById, updateStudent } from '@/services/studentService';
import { UserStorage } from "@/types/user";
import { Student } from '@/types/student';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import ErrorAlert from "@/components/ErrorAlert";

export default function EditForm({ params }: { params: { studentId: number } }) {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();
    const { setSuccessMessage } = useSuccessMessageContext();

    const [error, setError] = useState("");

    const [student, setStudent] = useState<Student>({});

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Fetch the existing student data when the component mounts
        const fetchStudentData = async () => {
            try {
                const existingStudent = await getStudentById(params.studentId.toString());
                setStudent(existingStudent);

            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, [params.studentId]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Update the student data with the form values
            const updatedStudent: Student = {
                ...student,

                DOB: new Date(student.DOB),
                CPR: Number(student.CPR),
                contact_number1: Number(student.contact_number1),
                contact_number2: Number(student.contact_number2),
                enrollment_date: new Date(student.enrollment_date),
            };

            // Send the request and log the response
            const response = await updateStudent(params.studentId.toString(), updatedStudent);
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
            <Breadcrumb pageName="Edit Student" />
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
                                        onChange={(e) => setStudent({ ...student, gender: (e.target.value) })}
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
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
                                {/* ... (Repeat similar structure for other input fields) */}

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

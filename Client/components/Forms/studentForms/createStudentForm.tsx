// Import necessary modules and components
'use client';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { createStudent } from '@/services/studentService';
import { useRouter } from 'next/navigation';
import { Student } from '@/types/student';
import { UserStorage } from "@/types/user";

export default function CreateForm() {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();

    const [studentName, setStudentName] = useState("");
    const [DOB, setDOB] = useState("");
    const [CPR, setCPR] = useState("");
    const [contactNumber1, setContactNumber1] = useState("");
    const [contactNumber2, setContactNumber2] = useState("");
    const [guardianName, setGuardianName] = useState("");
    const [enrollmentDate, setEnrollmentDate] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate form data
        let hasErrors = false;

        // Ensure student name is not empty
        if (!studentName.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, studentName: 'Student name cannot be empty.' }));
            hasErrors = true;
        }

        // Ensure CPR is a number and not empty
        if (isNaN(Number(CPR)) || CPR.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, CPR: 'Please enter a valid CPR.' }));
            hasErrors = true;
        }

        // Ensure contact numbers are numbers and not empty
        if (isNaN(Number(contactNumber1)) || contactNumber1.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, contactNumber1: 'Please enter a valid contact number.' }));
            hasErrors = true;
        }

        if (isNaN(Number(contactNumber2)) || contactNumber2.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, contactNumber2: 'Please enter a valid contact number.' }));
            hasErrors = true;
        }

        // Ensure enrollment date is not empty
        if (!enrollmentDate.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, enrollmentDate: 'Enrollment date cannot be empty.' }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            const studentData: Student = {
                student_name: studentName,
                DOB: new Date(DOB),
                CPR: Number(CPR),
                contact_number1: Number(contactNumber1),
                contact_number2: Number(contactNumber2),
                guardian_name: guardianName,
                enrollment_date: new Date(enrollmentDate),
                medical_history: medicalHistory,
                preschool_id: currentUser?.preschool_id
            };

            // Log the complete student data
            console.log('Student Data:', studentData);

            // Send the request and log the response
            const response = await createStudent(studentData);
            console.log('API Response:', response);

            // Redirect after successful submission
            router.push('/students');
        } catch (error) {
            console.error("Error creating student:", error);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Create Student" />

            <div className=" items-center justify-center min-h-screen">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Create Student
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
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        placeholder="Enter student's name"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.studentName ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.studentName && (
                                        <p className="text-error text-sm mt-1">{errors.studentName}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Date of Birth <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={DOB}
                                        onChange={(e) => setDOB(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                {/* Add other input fields for CPR, contact numbers, guardian name, enrollment date, and medical history */}

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        CPR <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={CPR}
                                        onChange={(e) => setCPR(e.target.value)}
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
                                        value={contactNumber1}
                                        onChange={(e) => setContactNumber1(e.target.value)}
                                        placeholder="Enter student's Contact Number"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.contactNumber1 ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.contactNumber1 && (
                                        <p className="text-error text-sm mt-1">{errors.contactNumber1}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contact Number 2<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={contactNumber2}
                                        onChange={(e) => setContactNumber2(e.target.value)}
                                        placeholder="Enter student's Contact Number"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.contactNumber2 ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.contactNumber2 && (
                                        <p className="text-error text-sm mt-1">{errors.contactNumber2}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Guardian Name<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={guardianName}
                                        onChange={(e) => setGuardianName(e.target.value)}
                                        placeholder="Enter student's Guardian Name"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.guardianName ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.guardianName && (
                                        <p className="text-error text-sm mt-1">{errors.guardianName}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Enrollment Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={enrollmentDate}
                                        onChange={(e) => setEnrollmentDate(e.target.value)}
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.enrollmentDate ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.enrollmentDate && (
                                        <p className="text-error text-sm mt-1">{errors.enrollmentDate}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Medical History <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={medicalHistory}
                                        onChange={(e) => setMedicalHistory(e.target.value)}
                                        placeholder="Enter student's medical history"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

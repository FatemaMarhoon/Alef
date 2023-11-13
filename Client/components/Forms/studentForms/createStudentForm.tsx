'use client'
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createStudent } from '@/services/studentService';
import { useRouter } from 'next/navigation'
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                //  class_id: 1,
                //take it from current user's preschool
                preschool_id: currentUser?.preschool_id
                // user_id: 2

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
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        CPR <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={CPR}
                                        onChange={(e) => setCPR(e.target.value)}
                                        placeholder="Enter student's CPR"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Enrollment Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={enrollmentDate}
                                        onChange={(e) => setEnrollmentDate(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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
                                {/* Add other input fields for CPR, contact numbers, guardian name, enrollment date, and medical history */}

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

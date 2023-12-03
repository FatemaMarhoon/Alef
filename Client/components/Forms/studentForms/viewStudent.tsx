// Import necessary modules and components
'use client'
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getStudentById } from '@/services/studentService';
import { Student } from '@/types/student';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Functional component for viewing student details
export default function ViewStudent({ studentId }: { studentId: string }) {
    const router = useRouter();

    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        // Fetch student data when the component mounts
        const fetchStudentData = async () => {
            try {
                const existingStudent = await getStudentById(studentId);
                setStudent(existingStudent);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, [studentId]);

    if (!student) {
        return null; // You can render a loading spinner or message here
    }

    return (
        <>
            <Breadcrumb pageName="View Student" />

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            View Student
                        </h3>
                    </div>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Student Name
                            </label>
                            <div>{student.student_name}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Date of Birth
                            </label>
                            <div>{new Date(student.DOB).toLocaleDateString()}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                CPR
                            </label>
                            <div>{student.CPR}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Contact Number 1
                            </label>
                            <div>{student.contact_number1}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Contact Number 2
                            </label>
                            <div>{student.contact_number2}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Guardian Name
                            </label>
                            <div>{student.guardian_name}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Enrollment Date
                            </label>
                            <div>{new Date(student.enrollment_date).toLocaleDateString()}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Medical History
                            </label>
                            <div>{student.medical_history}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Personal Picture
                            </label>
                            <img src={student.personal_picture} alt="Personal Picture" className="w-32 h-32" />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Certificate Of Birth
                            </label>
                            <img src={student.certificate_of_birth} alt="Certificate Of Birth" className="w-32 h-32" />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Passport
                            </label>
                            <img src={student.passport} alt="Passport" className="w-32 h-32" />
                        </div>
                        {/* Back to List Button */}
                        <div className="flex mt-4">
                            {/* Back to List Button */}
                            <div className="mr-4">
                                <Link href="/students" className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                    Back to List
                                </Link>
                            </div>

                            {/* Edit Student Button */}
                            <div>
                                <Link href={`/students/edit/${studentId}`}
                                    className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                    Edit Student
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

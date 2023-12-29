// Import necessary modules and components
'use client'
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb2";
import { getStudentById } from '@/services/studentService';
import { Student } from '@/types/student';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from "@/components/common/Loader"; // Import the Loader component

// Functional component for viewing student details
export default function ViewStudent({ studentId }: { studentId: string }) {
    const router = useRouter();

    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        // Fetch student data when the component mounts
        const fetchStudentData = async () => {
            try {
                const existingStudent = await getStudentById(studentId);
                setStudent(existingStudent);
                setLoading(false); // Set loading to false once data is fetched

            } catch (error) {
                console.error("Error fetching student data:", error);
                setLoading(false); // Set loading to false once data is fetched

            }
        };

        fetchStudentData();
    }, [studentId]);

    if (!student) {
        return null; // You can render a loading spinner or message here
    }

    return (
        <>
            {loading && <Loader />} {/* Show loading indicator */}

            <Breadcrumbs previousName='Students' currentName='Details' pageTitle="Student Details" previousPath='/students' />

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Student Details                        </h3>
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
                            <Link className="text-secondary" href={`${student?.personal_picture}`} target="_blank"><p>View File</p></Link>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Certificate Of Birth
                            </label>
                            <Link className="text-secondary" href={`${student?.certificate_of_birth}`} target="_blank"><p>View File</p></Link>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Passport
                            </label>
                            <Link className="text-secondary" href={`${student?.passport}`} target="_blank"><p>View File</p></Link>
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

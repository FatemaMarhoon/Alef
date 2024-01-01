'use client'
import React, { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb2";
import { getStudentById, deleteStudent } from "@/services/studentService";
import { useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation'
import { Student } from "@/types/student";
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import Link from "next/link";
import Loader from "@/components/common/Loader"; // Import the Loader component
import NotFound from '@/components/Pages/404';
import NotAuthorized from '@/components/Pages/403';
import { currentPreschool, currentUserRole } from '@/services/authService';
export default function DeleteStudentPage({ params }: { params: { studentId: number } }) {
    const router = useRouter();
    const [student, setStudent] = useState<Student | null>(null);
    const { setSuccessMessage } = useSuccessMessageContext();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true); // Added loading state
    const [notFound, setNotFound] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(true);
    useEffect(() => {
        console.log("Student ID:", params.studentId);

        async function fetchStudent() {
            try {
                if (params.studentId) {
                    const studentData = await getStudentById(params.studentId.toString());
                    setStudent(studentData);

                    // Authorization check after student data is fetched
                    if (studentData && studentData.preschool_id !== (await currentPreschool())) {
                        setAuthorized(false);
                    } else {
                        setAuthorized(true);
                    }

                    setLoading(false); // Set loading to false once data is fetched
                }
            } catch (error) {
                console.error("Error fetching student:", error);
                setLoading(false); // Set loading to false once data is fetched
            }
        }

        // Check if studentId is available before calling fetchStudent
        if (params.studentId) {
            fetchStudent();
        }

    }, [params.studentId]);



    const handleDelete = async () => {
        console.log("Before confirmation");
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        console.log("After confirmation", confirmDelete);

        if (confirmDelete && params.studentId) {
            try {
                const response = await deleteStudent(params.studentId.toString());
                console.log(response.data);

                const successMsg = response.data.message;
                if (response.status === 200 || response.status === 201) {
                    setSuccessMessage(successMsg);
                }

                console.log("Student deleted successfully");
                router.push("/students");
            } catch (error) {
                console.error("Error deleting student:", error);
            }
        }
    };


    return (
        <>
            {loading && <Loader />}
            {!loading && !authorized && <NotAuthorized />}
            {!loading && notFound && <NotFound></NotFound>}
            {!loading && !notFound && authorized && (
                <>
                    <Breadcrumbs previousName='Students' currentName='Delete' pageTitle="Delete Student" previousPath='/students' />

                    <div className="items-center justify-center min-h-screen">
                        <div className="flex flex-col gap-9">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">Delete Student</h3>
                                </div>
                                <div className="p-6.5">
                                    {student ? (
                                        <>
                                            <p>
                                                <strong>Student Name:</strong> {student.student_name}
                                            </p>
                                            <p>
                                                <strong>Date of Birth:</strong> {new Date(student.DOB).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <strong>CPR:</strong> {student.CPR}
                                            </p>
                                            <p>
                                                <strong>Contact Number 1:</strong> {student.contact_number1}
                                            </p>
                                            <p>
                                                <strong>Contact Number 1:</strong> {student.contact_number2}
                                            </p>
                                            <p>
                                                <strong>Guardian Name:</strong> {student.guardian_name}
                                            </p>
                                            <p>
                                                <strong>Enrollment Date:</strong> {new Date(student.enrollment_date).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <strong>Medical History:</strong> {student.medical_history}
                                            </p>
                                            {/* Display other student information using <p> or <h> tags */}
                                        </>
                                    ) : (
                                        <p>Loading student information...</p>
                                    )}

                                    <div className="mt-6 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="flex justify-center items-center rounded bg-danger p-3 font-medium text-white"
                                        >
                                            Delete Student
                                        </button>
                                        <Link
                                            href="/students"
                                            className="flex justify-center items-center rounded bg-primary p-3 font-medium text-gray"
                                        >
                                            Back To List
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

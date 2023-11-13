'use client'
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getStudentById, deleteStudent } from "@/services/studentService";
import { useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation'
import { Student } from "@/types/student";

export default function DeleteStudentPage({ studentId }: { studentId: string }) {
    const router = useRouter();
    //const studentId = router.query?.studentId as string | undefined;
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        console.log("Student ID:", studentId);

        async function fetchStudent() {
            try {
                if (studentId) {
                    const studentData = await getStudentById(studentId);
                    setStudent(studentData);
                }
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        }

        // Check if studentId is available before calling fetchStudent
        if (studentId) {
            fetchStudent();
        }
    }, [studentId]);

    const handleDelete = () => {
        console.log("Before confirmation");
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        console.log("After confirmation", confirmDelete);

        if (confirmDelete && studentId) {
            deleteStudent(studentId)
                .then(() => {
                    console.log("Student deleted successfully");
                    router.push("/students");
                })
                .catch((error) => {
                    console.error("Error deleting student:", error);
                });
        }
    };

    return (
        <>
            <Breadcrumb pageName="Delete Student" />

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
                                    {/* Display other student information using <p> or <h> tags */}
                                </>
                            ) : (
                                <p>Loading student information...</p>
                            )}

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex justify-center items-center rounded bg-danger p-3 font-medium text-white"
                                >
                                    Delete Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

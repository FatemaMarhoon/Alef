import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { deleteStudent, getStudentById } from '@/services/studentService';
import { useRouter } from 'next/navigation';

export default function DeleteForm() {
    const router = useRouter();
    const [studentId, setStudentId] = useState("");
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        // Fetch student data when the component mounts or studentId changes
        if (studentId) {
            fetchStudentData();
        }
    }, [studentId]);

    const fetchStudentData = async () => {
        try {
            const student = await getStudentById(studentId);
            setStudentData(student);
        } catch (error) {
            console.error("Error fetching student data:", error);
            setStudentData(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteStudent(studentId);
            router.push('/students');
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Delete Student" />

            <div className=" items-center justify-center min-h-screen">
                <div className="w-full max-w-md">
                    <div className="bg-white border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-md p-6">
                        <h2 className="text-2xl font-medium text-black dark:text-white mb-4">Delete Student</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-black dark:text-white mb-2">Student ID</label>
                                <input
                                    type="text"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    placeholder="Enter student ID"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            {studentData && (
                                <div className="mb-4">
                                    <label className="block text-black dark:text-white mb-2">Student Name</label>
                                    <input
                                        type="text"
                                        value={studentData.student_name}
                                        readOnly
                                        className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-4 font-medium outline-none"
                                    />
                                </div>
                                // Add more input fields for other student properties
                            )}

                            <button
                                type="submit"
                                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                            >
                                Delete Student
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

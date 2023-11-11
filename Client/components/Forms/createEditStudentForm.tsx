import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getStudentById, createStudent, updateStudent } from '@/services/studentService';
import { useRouter } from 'next/navigation';
import { Student } from '@/types/student';

export default function StudentForm() {
    const router = useRouter();
    const [studentId, setStudentId] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [student, setStudent] = useState({
        student_name: "",
        DOB: "",
        CPR: "",
        contact_number1: "",
        contact_number2: "",
        guardian_name: "",
        enrollment_date: "",
        medical_history: "",
    });

    useEffect(() => {
        // Check if studentId exists in the route, indicating an edit scenario
        if (studentId) {
            setIsEditing(true);
            // Fetch the student data when the component mounts
            const fetchStudentData = async () => {
                try {
                    const response = await getStudentById(studentId);
                    setStudent(response.data); // Assuming the response contains the student data
                } catch (error) {
                    console.error("Error fetching student data:", error);
                }
            };

            fetchStudentData();
        }
    }, [studentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const studentData: Student = {
                ...student,
                DOB: new Date(student.DOB),
                CPR: Number(student.CPR),
                contact_number1: Number(student.contact_number1),
                contact_number2: Number(student.contact_number2),
                enrollment_date: new Date(student.enrollment_date),
            };

            if (isEditing) {
                // Update existing student if in edit mode
                await updateStudent(studentId, studentData);
            } else {
                // Create a new student if in create mode
                await createStudent(studentData);
            }

            router.push('/students');
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} student:`, error);
        }
    };

    return (
        <>
            <Breadcrumb pageName={isEditing ? "Edit Student" : "Create Student"} />

            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md">
                    <div className="bg-white border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-md p-6">
                        <h2 className="text-2xl font-medium text-black dark:text-white mb-4">
                            {isEditing ? 'Edit Student' : 'Create Student'}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-black dark:text-white mb-2">Student Name</label>
                                <input
                                    type="text"
                                    name="student_name"
                                    value={student.student_name}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            {/* Add other input fields for editing or creating */}

                            <button
                                type="submit"
                                className={`w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md font-medium transition`}
                            >
                                {isEditing ? 'Update Student' : 'Create Student'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

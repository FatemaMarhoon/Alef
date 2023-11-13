import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getStudentById, updateStudent } from '@/services/studentService';
import { UserStorage } from "@/types/user";
import { Student } from '@/types/student';

export default function EditForm({ studentId }: { studentId: string }) {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();

    const [student, setStudent] = useState<Student>({
        student_name: "",
        DOB: "",
        CPR: null,
        contact_number1: null,
        contact_number2: "",
        guardian_name: "",
        enrollment_date: "",
        medical_history: "",
    });

    useEffect(() => {
        // Fetch the existing student data when the component mounts
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
            const response = await updateStudent(studentId, updatedStudent);
            console.log('API Response:', response);

            // Redirect after successful submission
            router.push('/students');
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Edit Student" />

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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Date of Birth <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={new Date(student.DOB).toLocaleDateString()}
                                        onChange={(e) => setStudent({ ...student, DOB: new Date(e.target.value) })}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contact Number 1<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={student.contact_number1}
                                        onChange={(e) => setStudent({ ...student, contact_number1: parseInt(e.target.value) })} placeholder="Enter student's Contact Number"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contact Number 2<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={student.contact_number2}
                                        onChange={(e) => setStudent({ ...student, contact_number2: parseInt(e.target.value) })} placeholder="Enter student's Contact Number"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Enrollment Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={new Date(student.enrollment_date).toLocaleDateString()}
                                        onChange={(e) => setStudent({ ...student, enrollment_date: new Date(e.target.value) })}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
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

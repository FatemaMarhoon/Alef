import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClassById } from '../../services/classService';
import { Student } from '../../types/student';
import { getStudents, getStudentsByClassId } from '../../services/studentService';
import { Class } from '../../types/class';
import Link from 'next/link';
import { updateStudent } from '../../services/studentService';
import { Grade } from '@mui/icons-material';
import Loader from "@/components/common/Loader"; // Import the Loader component
import Breadcrumbs from '../Breadcrumbs/Breadcrumb2';

interface ClassDetailsProps {
    classId: string;
}

const ClassDetails: React.FC<ClassDetailsProps> = (props) => {
    const { classId } = props;
    const router = useRouter();
    const [classDetails, setClassDetails] = useState<Class | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [unassignedStudents, setUnassignedStudents] = useState<Student[]>([]);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const [grade, setGrade] = useState("");
    const [studentsCount, setStudentsCount] = useState(0);
    const [loading, setLoading] = useState(true); // Added loading state

    const fetchData = async () => {
        try {
            // Fetch students for the class
            const studentsData = await getStudentsByClassId(classId as string);
            setStudents(studentsData);

            // Fetch class details
            const classDetailsData = await getClassById(classId as string);
            setClassDetails(classDetailsData);
            // Count the number of students
            const numberOfStudents = studentsData.length;
            console.log(`Number of students in the class: ${numberOfStudents}`);
            setStudentsCount(numberOfStudents);
            // setGrade(classDetailsData?.class.grade)
            setLoading(false); // Set loading to false once data is fetched

        } catch (error) {
            console.error('Error fetching class details:', error);
            setLoading(false); // Set loading to false once data is fetched

        }
    };

    useEffect(() => {
        if (classId) {
            fetchData();
        }
    }, [classId]);
    const removeStudentFromClass = async (studentId: number) => {
        try {
            // Get the current student data
            const student = students.find((s) => s.id === studentId);
            console.log("studentdata", student)
            // Confirm before removing
            const confirmRemove = window.confirm('Are you sure you want to remove this student from the class?');
            if (!confirmRemove) {
                return; // Do nothing if the user cancels
            }

            // Set class_id to null
            const updatedStudentData = {
                ...student,
                class_id: null,
            };
            console.log('Updating student with data:', updatedStudentData);

            // Update the student
            await updateStudent(studentId.toString(), updatedStudentData);

            // After updating, refetch the data to update the UI
            fetchData();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            console.log('grade: ', classDetails?.class.grade);
            const grade = classDetails?.class.grade;
            const studentsData = await getStudents(grade);

            // Filter students with non-null class_id
            const filteredStudents = studentsData.filter((student) => student.class_id == null);

            console.log('Fetched students:', filteredStudents);
            setUnassignedStudents(filteredStudents);
            setLoading(false); // Set loading to false once data is fetched

        } catch (error) {
            console.error('Error fetching students:', error);
            setLoading(false); // Set loading to false once data is fetched

        }
    };

    useEffect(() => {

        if (classDetails?.class.grade) {
            fetchStudents();
        }
    }, [classDetails?.class.grade]);

    const addStudentToClass = async () => {

        try {
            if (selectedStudentId === null) {
                console.error('No student selected.');
                return;
            }

            // Get the current student data
            const student = unassignedStudents.find((s) => s.id === selectedStudentId);
            console.log("student data", student)
            if (!student) {
                console.error(`Student with ID ${selectedStudentId} not found.`);
                return;
            }
            // Confirm before adding
            const confirmAdd = window.confirm('Are you sure you want to add this student to the class?');
            if (!confirmAdd) {
                return; // Do nothing if the user cancels
            }

            // Set class_id to class id
            const updatedStudentData = {
                ...student,
                class_id: classId,
            };
            console.log('Updating student with data:', updatedStudentData);

            console.log("selected student:", selectedStudentId)
            // Update the student
            await updateStudent(selectedStudentId.toString(), updatedStudentData);

            // After updating, refetch the data to update the UI
            fetchData();
            fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStudentId(Number(e.target.value));
    };

    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <>
                    <Breadcrumbs previousName='Classes' currentName='Details' pageTitle="Class Details" previousPath='/class' />
                    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Class Details
                            </h3>
                        </div>
                        {classDetails && (
                            <div className="mb-4.5">
                                <h1 className="mb-4.5">Class Name: {classDetails.class.class_name}</h1>
                                <h1 className="mb-4.5">Supervisor: {classDetails.class.supervisor}</h1>
                                <h1 className="mb-4.5">Grade: {classDetails.class.grade}</h1>
                                <h1 className="mb-4.5">Class Capacity: {classDetails.class.capacity}</h1>
                                <h1 className="mb-4.5">Current Capacity: {studentsCount}</h1>

                                <h1 className="mb-4.5">Classroom: {classDetails.class.classroom}</h1>

                                {/* Add more details as needed */}
                            </div>
                        )}


                        {/* Display the table of students */}
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark-bg-meta-4">
                                        <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                            Student ID
                                        </th>
                                        <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                            Student Name
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark-text-white">
                                            Date of Birth
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark-text-white">
                                            Gender
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark-text-white">
                                            CPR
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark-text-white">
                                            Contact Number 1
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark-text-white">
                                            Contact Number 2
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark-text-white">
                                            Guardian Name
                                        </th>


                                        <th className="py-4 px-4 font-medium text-black dark-text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, key) => (
                                        <tr key={key}>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <h5 className="font-medium text-black dark-text-white">
                                                    {student.id}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark-text-white">
                                                    {student.student_name}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark-text-white">
                                                    {new Date(student.DOB).toLocaleDateString()}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p
                                                    className="text-black dark-text-white"
                                                >
                                                    {student.gender}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark-text-white">
                                                    {student.CPR}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark-text-white">
                                                    {student.contact_number1}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark-text-white">
                                                    {student.contact_number2}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark-text-white">
                                                    {student.guardian_name}
                                                </p>
                                            </td>


                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <div className="flex items-center space-x-3.5">
                                                    <button className="hover:text-primary">
                                                        <Link href={`/students/view/${student.id}`}>
                                                            View
                                                        </Link>
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <Link
                            href="/class"
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                            Back To List
                        </Link>
                    </div></>
            )}
        </>
    );
};

export default ClassDetails;

'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClassById, updateClass } from '@/services/classService';
import { Student } from '@/types/student';
import { getStudents, getStudentsByClassId, updateStudentClassId } from '@/services/studentService';
import { Class } from '@/types/class';
import Link from 'next/link';
import { updateStudent } from '@/services/studentService';
import { getGrades, getGradeCapacityById } from '@/services/gradeCapacityService';
import { getNotAssignedStaff, getStaffById } from '@/services/staffService';
import { Staff } from '@/types/staff';
import { GradeCapacity } from '@/types/gradeCapacity';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import Loader from "@/components/common/Loader"; // Import the Loader component
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';
import NotFound from '@/components/Pages/404';
import NotAuthorized from '@/components/Pages/403';
import { currentPreschool } from "@/services/authService";
export default function EditForm({ params }: { params: { id: number } }) {
    const classId = params.id;
    const router = useRouter();
    const [classDetails, setClassDetails] = useState<Class | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [unassignedStudents, setUnassignedStudents] = useState<Student[]>([]);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const [supervisor, setSupervisor] = useState("");
    const [selectedGradeId, setSelectedGradeId] = useState('');
    const [gradesList, setGradesList] = useState<GradeCapacity[]>([]);
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const { setSuccessMessage } = useSuccessMessageContext();
    const [studentsCount, setStudentsCount] = useState(0);
    const [loading, setLoading] = useState(true); // Added loading state
    const [notFound, setNotFound] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(true);
    const fetchData = async () => {
        try {
            // Fetch class details
            const classDetailsData = await getClassById(classId.toString());
            console.log(classDetailsData);
            // Authorization check based on class's preschool ID
            if (classDetailsData && classDetailsData.class.preschool_id !== (await currentPreschool())) {
                setAuthorized(false);
                setLoading(false);
                return; // Exit the function if unauthorized
            } else {
                setAuthorized(true);
            }

            setClassDetails(classDetailsData);

            // // Fetch students for the class
            const studentsData = await getStudentsByClassId(classId.toString());
            setStudents(studentsData);



            // Count the number of students
            const numberOfStudents = studentsData.length;
            console.log(`Number of students in the class: ${numberOfStudents}`);
            setStudentsCount(numberOfStudents);

            const staff = await getStaffById(classDetailsData?.class.supervisor);
            const staffName = staff.name
            console.log(staffName);
            setSupervisor(staffName);
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
            await updateStudentClassId(studentId.toString(), null);

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
            // Check if adding the student will exceed the class capacity
            const updatedCapacity = studentsCount + 1; // Calculate the updated capacity
            if (updatedCapacity > classDetails.class.capacity) {
                // Display an alert or message indicating that the class is at full capacity
                alert('Class is at full capacity. Cannot add more students.');
                return;
            }
            // Set class_id to class id
            const updatedStudentData = {
                ...student,
                class_id: classId,
            };
            console.log('Updating student with data:', updatedStudentData);

            console.log("selected student:", selectedStudentId)
            // Update the student
            await updateStudentClassId(selectedStudentId.toString(), classId);

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

    const updateClassDetails = async () => {
        try {

            await updateClass(classId.toString(), classDetails?.class);

            setSuccessMessage("Class is updated successfully");

            try {
                await router.push('/class');
                console.log('After router.push');
            } catch (error) {
                console.error('Error during redirection:', error);
            }
            console.log('Class details updated successfully!');
        } catch (error) {
            console.error('Error updating class details:', error);
            // Handle errors appropriately
        }
    };

    useEffect(() => {
        async function fetchGradesList() {
            try {


                const response = await getGrades();
                console.log('Grade List Response:', response);

                // Log the response.data or the actual array
                console.log('Grade List Data:', response || response);

                setGradesList(response || []);
                setLoading(false); // Set loading to false once data is fetched


            } catch (error) {
                console.error("Error fetching staff list:", error);
                setStaffList([]);
                // Set loading to false in case of an error (if needed)
                setLoading(false); // Set loading to false once data is fetched


            }
        }

        fetchGradesList();
    }, []); // Empty

    // Fetch staff members when the component mounts
    useEffect(() => {
        async function fetchStaffList() {
            try {
                const response = await getNotAssignedStaff();
                console.log('Staff List Response:', response);

                // Log the response.data or the actual array
                console.log('Staff List Data:', response.data || response);

                setStaffList(response || []); // Assuming response.data is the array of staff
                // Set loading to false after fetching data (if needed)
                console.log("staffff", staffList);

                setLoading(false); // Set loading to false once data is fetched


            } catch (error) {
                console.error("Error fetching staff list:", error);
                setLoading(false); // Set loading to false once data is fetched

                setStaffList([]);
                // Set loading to false in case of an error (if needed)

            }
        }

        fetchStaffList();
    }, []); // Empty

    return (
        <>
            {loading && <Loader />}
            {!loading && !authorized && <NotAuthorized />}
            {!loading && notFound && <NotFound></NotFound>}
            {!loading && !notFound && authorized && (
                <>
                    <Breadcrumbs previousName='Classes' currentName='Edit' pageTitle="Edit Class" previousPath='/class' />
                    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">

                            <h3 className="font-medium text-black dark:text-white">
                                Class Details
                            </h3>
                        </div>
                        {classDetails && (
                            <div className="mb-4.5">
                                {/* Editable Class Name */}
                                <div className="mb-2">
                                    <label htmlFor="className" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Class Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="className"
                                        name="className"
                                        value={classDetails.class.class_name}
                                        onChange={(e) => {
                                            setClassDetails({
                                                ...classDetails,
                                                class: {
                                                    ...classDetails.class,
                                                    class_name: e.target.value,
                                                },
                                            });
                                        }}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                </div>

                                {/* Editable Supervisor */}
                                <div className="mb-2">
                                    <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Current  Supervisor:
                                    </label>
                                    <h3 className="mb-4.5"><strong>{supervisor}</strong></h3>

                                    <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Change Supervisor:
                                    </label>
                                    <select
                                        name="supervisor"
                                        value={classDetails.class.supervisor}
                                        onChange={(e) => {
                                            setClassDetails({
                                                ...classDetails,
                                                class: {
                                                    ...classDetails.class,
                                                    supervisor: e.target.value,
                                                },
                                            });
                                        }}

                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    >
                                        <option value="">Select Supervisor</option>
                                        {staffList.map((supervisor, optionIndex) => (
                                            <option key={optionIndex} value={supervisor.id}>
                                                {supervisor.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                {/* Editable Grade */}
                                <div className="mb-2">
                                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Grade:
                                    </label>
                                    <select
                                        name="grade"
                                        value={classDetails.class.grade}
                                        onChange={(e) => {
                                            setClassDetails({
                                                ...classDetails,
                                                class: {
                                                    ...classDetails.class,
                                                    grade: e.target.value,
                                                },
                                            });
                                        }}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    >
                                        <option value="">Select Grade</option>
                                        {gradesList.map((grade, optionIndex) => (
                                            <option key={optionIndex} value={grade.grade}>
                                                {grade.grade}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <div className="mb-2">
                                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Current  Capacity:
                                    </label>
                                    <h3 className="mb-4.5"><strong>{studentsCount}</strong></h3>
                                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Class Capacity:
                                    </label>
                                    <input
                                        type="text"
                                        id="capacity"
                                        name="capacity"
                                        value={classDetails.class.capacity}
                                        onChange={(e) => {
                                            setClassDetails({
                                                ...classDetails,
                                                class: {
                                                    ...classDetails.class,
                                                    capacity: e.target.value,
                                                },
                                            });
                                        }}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="classroom" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Classroom:
                                    </label>
                                    <input
                                        type="text"
                                        id="classroom"
                                        name="classroom"
                                        value={classDetails.class.classroom}
                                        onChange={(e) => {
                                            setClassDetails({
                                                ...classDetails,
                                                class: {
                                                    ...classDetails.class,
                                                    classroom: e.target.value,
                                                },
                                            });
                                        }}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={updateClassDetails}
                                        className="w-full px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                                    >
                                        Update Class Details
                                    </button>
                                </div>
                                {/* Add more editable fields as needed */}
                            </div>
                        )}




                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Students
                            </h3>
                        </div>
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
                                                <div className="flex items-center space-x-3.5">
                                                    <button className="hover:text-primary">
                                                        <Link href={`/students/view/${student.id}`}>
                                                            View
                                                        </Link>
                                                    </button>
                                                    <button className="hover:text-primary" onClick={() => removeStudentFromClass(student.id)}>
                                                        Remove
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mb-4.5"></div>
                        <div className="mb-4.5">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Add New Student
                                </h3>
                            </div>
                            {/* Display the list of available students */}
                            <select onChange={handleSelectChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                            >
                                <option value="" disabled selected>
                                    Select a student
                                </option>
                                {unassignedStudents.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.student_name}
                                    </option>
                                ))}
                            </select>
                            <div className="mb-4.5"></div>
                            {/* Add a button to trigger adding the selected student to the class */}
                            <button
                                className="w-full px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                                onClick={addStudentToClass}>
                                Add
                            </button>
                        </div>
                    </div></>
            )}
        </>
    );
};



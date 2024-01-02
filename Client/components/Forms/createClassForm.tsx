import React, { useState, useEffect } from 'react';
import { getStudents, updateStudentClassId } from '../../services/studentService';
import { Student } from '../../types/student';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getClasses } from '../../services/classService'; // Import the class service
import { Class } from '../../types/class';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import Loader from "@/components/common/Loader"; // Import the Loader component
import Breadcrumbs from '../Breadcrumbs/Breadcrumb2';


const CreateForm: React.FC = () => {
    const searchParams = useSearchParams();
    const numClassesParam = Number(searchParams.get('numClasses'));
    const gradeParam = searchParams.get('grade');
    const classIDsParam = searchParams.get('classIds');
    const classIds = typeof classIDsParam === 'string' ? classIDsParam : '';
    const classIDsArray = Array.isArray(classIds) ? classIds : [classIds];
    console.log('classIds:', classIDsArray);
    const router = useRouter();

    const [students, setStudents] = useState<Student[]>([]);
    const [classAssignments, setClassAssignments] = useState<Record<string, Student[]>>({});
    const [showStudents, setShowStudents] = useState(true);
    const [classes, setClasses] = useState<Class[]>([]);
    const { setSuccessMessage } = useSuccessMessageContext();
    const [classNames, setClassNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // Extract class IDs from classIDsArray
        const classIds = classIDsArray[0].split(',');

        // Fetch class data when the component mounts
        async function fetchClasses() {
            try {
                const classesData = await getClasses();
                setClasses(classesData);

                // Extract class names based on class IDs
                const classNames = classIds.map((classId: any) => {
                    const foundClass = classesData.find((c) => c.id === parseInt(classId));
                    return foundClass ? foundClass.class_name : `Class ${classId}`;
                });

                // Dynamically generate class assignments based on class names
                const updatedClassAssignments: Record<string, Student[]> = {};

                classNames.forEach((className: any) => {
                    updatedClassAssignments[className] = [];
                });

                // Set the updated class assignments in the state
                setClassAssignments(updatedClassAssignments);

                // You can perform additional logic here if needed

            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }

        fetchClasses();
    }, []); // Empty dependency array to run only once when the component mounts

    const fetchStudents = async () => {
        try {
            const studentsData = await getStudents(gradeParam?.toString());

            // Filter students with non-null class_id
            const filteredStudents = studentsData.filter(student => student.class_id == null);

            console.log('Fetched students:', filteredStudents);
            setStudents(filteredStudents);
            setLoading(false); // Set loading to false in case of an error

        } catch (error) {
            console.error('Error fetching students:', error);
            setLoading(false); // Set loading to false in case of an error

        }
    };


    // Function to get class name by ID
    const getClassNameById = (classId: string): string => {
        const foundClass = classes.find((c) => c.id === parseInt(classId));
        return foundClass ? foundClass.class_name : `Class ${classId}`;
    };

    const generateClassAssignments = async () => {
        if (!Array.isArray(classIDsArray) || classIDsArray.length === 0) {
            console.error('classIDsArray is undefined or empty');
            return; // Exit the function early if classIDsArray is not valid
        }

        try {
            // Fetch class data when generating class assignments
            const classesData = await getClasses();
            setClasses(classesData);

            // Dynamically generate class assignments based on class IDs
            const updatedClassAssignments: Record<string, Student[]> = {};

            const classIds = classIDsArray[0].split(',');

            classIds.forEach((classId: string, i: any) => {
                const className = getClassNameById(classId.trim());
                updatedClassAssignments[className] = [];
            });

            setClassAssignments(updatedClassAssignments);
            fetchStudents();

            setShowStudents(true);
            console.log('Class Assignments:', updatedClassAssignments);

        } catch (error) {
            console.error('Error fetching classes:', error);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };


    const handleAutomatedAssignment = () => {
        // Check if classIDsArray is a valid array and not empty
        if (!Array.isArray(classIDsArray) || classIDsArray.length === 0) {
            console.error('classIDsArray is undefined or empty');
            return; // Exit the function early if classIDsArray is not valid
        }

        // Separate male and female students
        const maleStudents = students.filter(student => student.gender === 'Male');
        const femaleStudents = students.filter(student => student.gender === 'Female');

        // Get the total number of classes
        const totalClasses = classIDsArray.length;

        // Initialize an object to store class assignments
        const updatedClassAssignments: Record<string, Student[]> = {};

        // Split the first element of classIDsArray to get individual class IDs
        const classIds = classIDsArray[0].split(',');

        // Initialize a set to keep track of assigned students
        const assignedStudentsSet = new Set<Student>();

        classIds.forEach((classId: any, i: number) => {
            const className = getClassNameById(classId.trim());
            updatedClassAssignments[className] = [];

            // Distribute male students to the current class
            for (let j = i; j < maleStudents.length; j += totalClasses) {
                const student = maleStudents[j];

                // Check if the student is not already assigned
                if (!assignedStudentsSet.has(student)) {
                    updatedClassAssignments[className].push(student);
                    assignedStudentsSet.add(student);

                    console.log(`Assigned male student ${student.student_name} to ${className}`);
                }
            }

            // Distribute remaining female students to the current class
            femaleStudents.forEach((student, index) => {
                // Check if the student is not already assigned
                if (!assignedStudentsSet.has(student) && index % totalClasses === i) {
                    updatedClassAssignments[className].push(student);
                    assignedStudentsSet.add(student);

                    console.log(`Assigned female student ${student.student_name} to ${className}`);
                }
            });
        });


        // Validate and adjust class assignments to remove duplications
        const classNames = Object.keys(updatedClassAssignments);
        const firstClass = updatedClassAssignments[classNames[0]];

        for (let i = 1; i < classNames.length; i++) {
            const currentClass = updatedClassAssignments[classNames[i]];

            while (firstClass.length > currentClass.length) {
                // Move a student from the first class to the current class
                const movedStudent = firstClass.pop();
                if (movedStudent) {
                    currentClass.push(movedStudent);
                }
            }
        }

        // Set the updated class assignments in the state
        setClassAssignments(updatedClassAssignments);

        // Hide the list of students
        setShowStudents(false);
    };

    const handleReset = () => {
        if (!Array.isArray(classIDsArray) || classIDsArray.length === 0) {
            console.error('classIDsArray is undefined or empty');
            return; // Exit the function early if classIDsArray is not valid
        }

        // Dynamically generate class assignments based on class IDs
        const updatedClassAssignments: Record<string, Student[]> = {};

        const classIds = classIDsArray[0].split(',');

        classIds.forEach((classId: string, i: any) => {
            const className = getClassNameById(classId.trim());
            updatedClassAssignments[className] = [];
        });


        setClassAssignments(updatedClassAssignments);
        fetchStudents();

        setShowStudents(true);
        console.log('Class Assignments:', updatedClassAssignments);
    };

    const handleSave = async () => {
        try {
            if (!Array.isArray(classIDsArray) || classIDsArray.length === 0) {
                console.error('classIDsArray is undefined or empty');
                return; // Exit the function early if classIDsArray is not valid
            }

            const updatedStudents: Student[] = [];

            Object.entries(classAssignments).forEach(([className, classStudents], classIndex) => {
                // Use modulo to handle cases where classStudents is longer than classIds
                const classIdIndex = classIndex % classIDsArray[0].split(',').length;
                const classId = classIDsArray[0].split(',')[classIdIndex]?.trim() || null;

                updatedStudents.push(
                    ...classStudents.map((student: Student) => ({
                        ...student,
                        class_id: classId, // Assign class ID based on the array
                    }))
                );
            });


            console.log('Class Assignments before update:', classAssignments);
            console.log('Updated Students before update:', updatedStudents);

            for (const student of updatedStudents) {
                const response = await updateStudentClassId(student.id.toString(), student.class_id);
                console.log('API Response:', response);

                if (response.status >= 200 && response.status < 300) {
                    // Successful response
                    setSuccessMessage("Classes created and students are assigned successfully!");
                } else {
                    // Error response
                    console.error('Error updating students:', response);
                    // Display error message to the user
                    // You may want to extract the error message from the response and display it
                }
            }

            try {
                await router.push('/class');
                console.log('After router.push');
            } catch (error) {
                console.error('Error during redirection:', error);
            }

        } catch (error) {
            // Handle errors here
            console.error('Error updating students:', error);
        }
    };


    const handleOnDrag = (e: React.DragEvent<HTMLDivElement>, studentId: number) => {
        e.dataTransfer.setData('studentId', studentId.toString());
    };

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, destinationClassName: string | null) => {
        e.preventDefault();
        const studentId = e.dataTransfer.getData('studentId');
        const student = students.find(student => student.id.toString() === studentId);

        if (student) {
            const updatedClassAssignments = { ...classAssignments };

            // If dropping outside class areas, add the student back to the list
            if (destinationClassName === null) {
                setStudents(prevStudents => [...prevStudents, student]);
            } else {
                // If the student is dragged from the list, remove it from the list
                // setStudents(prevStudents => prevStudents.filter(s => s.id.toString() !== studentId));

                // Remove the student from the source class
                const previousClass = Object.keys(updatedClassAssignments).find(
                    key => updatedClassAssignments[key].some((s: { id: { toString: () => any; }; }) => s.id.toString() === studentId)
                );

                if (previousClass && previousClass !== destinationClassName) {
                    updatedClassAssignments[previousClass] = updatedClassAssignments[previousClass].filter(
                        (s: { id: { toString: () => any; }; }) => s.id.toString() !== studentId
                    );
                }

                // Add the student to the destination class
                updatedClassAssignments[destinationClassName] = [...updatedClassAssignments[destinationClassName], student];
                setClassAssignments(updatedClassAssignments);

            }
        }
    };


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // Add a visual indication, for example:
        e.currentTarget.style.backgroundColor = 'lightblue';
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        // Remove the visual indication when the dragged element leaves
        e.currentTarget.style.backgroundColor = '';
    };

    const handleToggleStudents = () => {
        setShowStudents(prevShowStudents => !prevShowStudents);
    };

    useEffect(() => {
        console.log('Fetching students and generating class assignments...');

        fetchStudents();
        //  generateClassAssignments();
    }, [gradeParam, numClassesParam]);

    useEffect(() => {

        // Print the list of students for each class
        console.log('Class Assignments:', classAssignments);
        console.log('Students:', students);
    }, [students]);



    return (
        <>
            {loading && <Loader />}


            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">

                <div className="flex flex-col items-center h-screen space-y-4">
                    <div className="space-x-4">
                        <button
                            onClick={handleAutomatedAssignment}
                            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                        >
                            Automate Assignment
                        </button>

                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                        >
                            Reset
                        </button>

                        <button
                            onClick={handleToggleStudents}
                            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                        >
                            {showStudents ? 'Hide Students' : 'Show Students'}
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90 mt-4"
                        >
                            Save
                        </button>
                    </div>

                    <div className="flex space-x-4">
                        <div className="widgets" style={{ display: showStudents ? 'block' : 'none' }}>
                            {students.map(student => (
                                <div
                                    key={student.id}
                                    draggable
                                    onDragStart={e => handleOnDrag(e, student.id)}
                                    className="bg-gray-200 p-2 rounded-md cursor-move"
                                >
                                    {student.student_name}
                                </div>
                            ))}
                        </div>

                        {Object.keys(classAssignments).map(className => (
                            <div
                                key={className}
                                className="class-area w-60 bg-white p-4 border-2 border-dashed border-gray-400 rounded-md"
                                onDrop={e => handleOnDrop(e, className)}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <h2 className="text-lg font-semibold">{className}</h2>
                                {classAssignments[className].map((student: { id: React.Key | null | undefined; student_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                                    <div
                                        key={student.id}
                                        draggable
                                        onDragStart={e => handleOnDrag(e, student.id)}
                                        className="bg-blue-100 p-2 mt-2 rounded-md cursor-move"
                                    >
                                        {student.student_name}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="max-w-full overflow-x-auto" >
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
                                        Enrollment Date
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Medical History
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
                                            <p className="text-black dark-text-white">
                                                {new Date(student.enrollment_date).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {student.medical_history}
                                            </p>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
}

export default CreateForm;

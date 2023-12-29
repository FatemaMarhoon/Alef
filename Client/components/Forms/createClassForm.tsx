import React, { useState, useEffect } from 'react';
import { getStudents, updateStudentClassId } from '../../services/studentService';
import { Student } from '../../types/student';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getClasses } from '../../services/classService'; // Import the class service
import { Class } from '../../types/class';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
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

    useEffect(() => {
        // Fetch class data when the component mounts
        async function fetchClasses() {
            try {
                const classesData = await getClasses();
                setClasses(classesData);


            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }

        fetchClasses();
    }, []);

    const fetchStudents = async () => {
        try {
            const studentsData = await getStudents(gradeParam?.toString());

            // Filter students with non-null class_id
            const filteredStudents = studentsData.filter(student => student.class_id == null);

            console.log('Fetched students:', filteredStudents);
            setStudents(filteredStudents);
        } catch (error) {
            console.error('Error fetching students:', error);
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

            classIds.forEach((classId, i) => {
                const className = getClassNameById(classId.trim());
                updatedClassAssignments[className] = [];
            });

            setClassAssignments(updatedClassAssignments);
            fetchStudents();

            setShowStudents(true);
            console.log('Class Assignments:', updatedClassAssignments);
        } catch (error) {
            console.error('Error fetching classes:', error);
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

        classIds.forEach((classId: any, i) => {
            const className = getClassNameById(classId.trim());
            updatedClassAssignments[className] = [];

            // Distribute male students to the current class
            for (let j = i; j < maleStudents.length; j += totalClasses) {
                updatedClassAssignments[className].push(maleStudents[j]);
                console.log(`Assigned male student ${maleStudents[j].student_name} to ${className}`);
            }

            // Distribute remaining female students to the current class
            femaleStudents.forEach((student, index) => {
                if (index % totalClasses === i) {
                    updatedClassAssignments[className].push(student);
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

        classIds.forEach((classId, i) => {
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
                // console.log('Updating student:', student);
                const response = await updateStudentClassId(student.id.toString(), student.class_id)
            }

            setSuccessMessage("Classes created and students are assigned successfully!");

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
        generateClassAssignments();
    }, [gradeParam, numClassesParam]);

    useEffect(() => {
        // Print the list of students for each class
        console.log('Class Assignments:', classAssignments);
        console.log('Students:', students);
    }, [classAssignments, students]);



    return (
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
                                        //                                         className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                                        //    ${student.gender === "Male" ? "text-blue-500 bg-blue-100" :
                                        //                                                 student.gender === "Female" ? "text-pink-500 bg-pink-100" : ""}
                                        // `}

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
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-primary">
                                                <Link href={`/students/view/${student.id}`}>

                                                    <svg
                                                        className="fill-current"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 18 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                            fill=""
                                                        />
                                                    </svg>
                                                </Link>
                                            </button>
                                            <button className="hover:text-primary">
                                                {/* <Link href={`/students/delete/${student.id}`}> */}
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                        fill=""
                                                    />
                                                </svg>

                                                {/* </Link> */}
                                            </button>
                                            <button className="hover:text-primary">
                                                <Link href={`/students/edit/${student.id}`}>
                                                    <svg
                                                        className="fill-current"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 18 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                                            fill=""
                                                        />
                                                    </svg>
                                                </Link>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default CreateForm;

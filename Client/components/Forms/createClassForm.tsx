import React, { useState, useEffect } from 'react';
import { getStudents, updateStudent } from '../../services/studentService';
import { Student } from '../../types/student';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface CreateFormProps {
    numClasses: number;
    grade: string;
    classIDs: string | string[] | undefined;


}
const CreateForm: React.FC<CreateFormProps> = ({ classIDs }) => {
    const searchParams = useSearchParams();
    const numClassesParam = Number(searchParams.get('numClasses'));
    const gradeParam = searchParams.get('grade');
    const classIDsParam = searchParams.get('classIds');
    const classIds = typeof classIDsParam === 'string' ? classIDsParam : '';
    const classIDsArray = Array.isArray(classIds) ? classIds : [classIds];
    console.log('classIds:', classIDsArray);

    const [students, setStudents] = useState<Student[]>([]);
    const [classAssignments, setClassAssignments] = useState<Record<string, Student[]>>({});
    const [showStudents, setShowStudents] = useState(true);


    const fetchStudents = async () => {
        try {
            const studentsData = await getStudents(gradeParam?.toString());
            console.log('Fetched students:', studentsData);
            setStudents(studentsData);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // const generateClassAssignments = () => {
    //     const updatedClassAssignments: Record<string, Student[]> = {};
    //     for (let i = 0; i < numClassesParam; i++) {
    //         const className = `Class ${i + 1}`;
    //         updatedClassAssignments[className] = [];
    //     }
    //     setClassAssignments(updatedClassAssignments);
    // };

    const generateClassAssignments = () => {
        if (!Array.isArray(classIDsArray) || classIDsArray.length === 0) {
            console.error('classIDsArray is undefined or empty');
            return; // Exit the function early if classIDsArray is not valid
        }

        const classIds = classIDsArray[0].split(',');

        const updatedClassAssignments: Record<string, Student[]> = {};

        classIds.forEach((classId, i) => {
            const className = `Class ${classId.trim()}`;
            updatedClassAssignments[className] = [];

            // You can also store the classId in the state if needed
            // setClassIdForClassArea(className, classId);
        });

        setClassAssignments(updatedClassAssignments);
    };

    const handleAutomatedAssignment = () => {
        if (!Array.isArray(classIDsArray) || classIDsArray.length === 0) {
            console.error('classIDsArray is undefined or empty');
            return; // Exit the function early if classIDsArray is not valid
        }

        const maleStudents = students.filter(student => student.gender === 'Male');
        const femaleStudents = students.filter(student => student.gender === 'Female');

        const totalClasses = classIDsArray.length;
        const updatedClassAssignments: Record<string, Student[]> = {};
        const classIds = classIDsArray[0].split(',');

        classIds.forEach((classIds, i) => {
            const className = `Class ${classIds.trim()}`;
            updatedClassAssignments[className] = [];

            // Distribute male students
            for (let j = i; j < maleStudents.length; j += totalClasses) {
                updatedClassAssignments[className].push(maleStudents[j]);
                console.log(`Assigned male student ${maleStudents[j].student_name} to ${className}`);
            }

            // Distribute remaining female students
            femaleStudents.forEach((student, index) => {
                if (index % totalClasses === i) {
                    updatedClassAssignments[className].push(student);
                    console.log(`Assigned female student ${student.student_name} to ${className}`);
                }
            });
        });

        // Validate and adjust class assignments
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

        setClassAssignments(updatedClassAssignments);
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

        classIds.forEach((classIds, i) => {
            const className = `Class ${classIds.trim()}`;
            updatedClassAssignments[className] = [];
        });

        setClassAssignments(updatedClassAssignments);
        fetchStudents();

        setShowStudents(true);
        console.log('Class Assignments:', updatedClassAssignments);
    };

    // const handleAutomatedAssignment = () => {
    //     const maleStudents = students.filter(student => student.gender === 'Male');
    //     const femaleStudents = students.filter(student => student.gender === 'Female');

    //     const totalClasses = numClassesParam;
    //     const updatedClassAssignments: Record<string, Student[]> = {};

    //     // Initialize arrays for each class
    //     for (let i = 0; i < totalClasses; i++) {
    //         const className = `Class ${i + 1}`;
    //         updatedClassAssignments[className] = [];
    //     }

    //     // Distribute male students
    //     for (let i = 0; i < maleStudents.length; i++) {
    //         const className = `Class ${i % totalClasses + 1}`;
    //         updatedClassAssignments[className].push(maleStudents[i]);
    //         console.log(`Assigned male student ${maleStudents[i].student_name} to ${className}`);
    //     }



    //     // Distribute remaining female students
    //     femaleStudents.forEach((student, index) => {
    //         const className = `Class ${index % totalClasses + 1}`;
    //         updatedClassAssignments[className].push(student);
    //         console.log(`Assigned female student ${student.student_name} to ${className}`);
    //     });

    //     // Validate and adjust class assignments
    //     const classNames = Object.keys(updatedClassAssignments);
    //     const firstClass = updatedClassAssignments[classNames[0]];

    //     for (let i = 1; i < classNames.length; i++) {
    //         const currentClass = updatedClassAssignments[classNames[i]];

    //         while (firstClass.length > currentClass.length) {
    //             // Move a student from the first class to the current class
    //             const movedStudent = firstClass.pop();
    //             if (movedStudent) {
    //                 currentClass.push(movedStudent);
    //             }
    //         }
    //     }

    //     setClassAssignments(updatedClassAssignments);
    //     setShowStudents(false);
    // };


    // const handleReset = () => {
    //     // Dynamically generate class assignments based on numClassesParam
    //     const updatedClassAssignments: Record<string, Student[]> = {};
    //     for (let i = 0; i < numClassesParam; i++) {
    //         const className = `Class ${i + 1}`;
    //         updatedClassAssignments[className] = [];
    //     }

    //     setClassAssignments(updatedClassAssignments);
    //     fetchStudents();

    //     setShowStudents(true);
    //     console.log('Class Assignments:', updatedClassAssignments);

    // };

    const handleSave = async () => {
        try {
            if (!Array.isArray(classIDsArray) || classIDsArray.length === 0) {
                console.error('classIDsArray is undefined or empty');
                return; // Exit the function early if classIDsArray is not valid
            }

            const updatedStudents: Student[] = [];

            Object.entries(classAssignments).forEach(([className, classStudents], classIndex) => {
                const classIds = classIDsArray[0].split(',');

                updatedStudents.push(
                    ...classStudents.map((student: Student, studentIndex) => ({
                        ...student,
                        class_id: classIds?.[studentIndex]?.trim() || null, // Assign class ID based on the array
                    }))
                );
            });

            console.log('Class Assignments before update:', classAssignments);
            console.log('Updated Students before update:', updatedStudents);

            for (const student of updatedStudents) {
                // Ensure that class_id is set and not null in the payload
                if (student.class_id === undefined || student.class_id === null) {
                    console.error('class_id is not set or is null for student:', student);
                    await updateStudent(student.id.toString(), student);

                    continue; // Skip this student and move to the next one
                }

                console.log('Updating student:', student);
                await updateStudent(student.id.toString(), student);
            }

            // Example: Update students in your state (replace this with your actual logic)
            setStudents(updatedStudents);

            // Reset class assignments or perform any other necessary actions
            generateClassAssignments();
            setShowStudents(true);

            // Log the final state of classAssignments after the update
            console.log('Class Assignments after update:', classAssignments);
        } catch (error) {
            // Handle errors here
            console.error('Error updating students:', error);
        }
    };


    const handleOnDrag = (e: React.DragEvent<HTMLDivElement>, studentId: number) => {
        e.dataTransfer.setData('studentId', studentId.toString());
    };

    // const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, className: string) => {
    //     e.preventDefault();
    //     const studentId = e.dataTransfer.getData('studentId');
    //     const student = students.find(student => student.id.toString() === studentId);

    //     if (student) {
    //         const updatedClassAssignments = { ...classAssignments };
    //         const previousClass = Object.keys(updatedClassAssignments).find(
    //             key => updatedClassAssignments[key].some((s: { id: { toString: () => any; }; }) => s.id.toString() === studentId)
    //         );

    //         if (previousClass && previousClass !== className) {
    //             updatedClassAssignments[previousClass] = updatedClassAssignments[previousClass].filter(
    //                 (s: { id: { toString: () => any; }; }) => s.id.toString() !== studentId
    //             );
    //         }

    //         updatedClassAssignments[className] = [...updatedClassAssignments[className], student];
    //         setClassAssignments(updatedClassAssignments);
    //     }
    // };

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, destinationClassName: string) => {
        e.preventDefault();
        const studentId = e.dataTransfer.getData('studentId');
        const student = students.find(student => student.id.toString() === studentId);

        if (student) {
            const updatedClassAssignments = { ...classAssignments };

            // Remove the student from the main list
            setStudents(prevStudents => prevStudents.filter(s => s.id.toString() !== studentId));

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
    };



    const handleDragOver = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
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
                        className="class-area bg-gray-100 p-4 border-2 border-dashed border-gray-400 rounded-md"
                        onDrop={e => handleOnDrop(e, className)}
                        onDragOver={handleDragOver}
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
        </div>
    );
}

export default CreateForm;

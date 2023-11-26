import React, { useState, useEffect } from 'react';
import { getStudents } from '../../services/studentService';
import { Student } from '../../types/student';
import { useSearchParams } from 'next/navigation';

interface CreateFormProps {
    numClasses: number;
    grade: string;
}

const CreateForm: React.FC<CreateFormProps> = ({ numClasses, grade }) => {
    const searchParams = useSearchParams();
    const numClassesParam = Number(searchParams.get('numClasses'));
    const gradeParam = searchParams.get('grade');

    console.log('Props in CreateForm:', numClassesParam, gradeParam);

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

    const generateClassAssignments = () => {
        const updatedClassAssignments: Record<string, Student[]> = {};
        for (let i = 0; i < numClassesParam; i++) {
            const className = `Class ${i + 1}`;
            updatedClassAssignments[className] = [];
        }
        setClassAssignments(updatedClassAssignments);
    };


    const handleAutomatedAssignment = () => {
        const maleStudents = students.filter(student => student.gender === 'Male');
        const femaleStudents = students.filter(student => student.gender === 'Female');

        const totalClasses = numClassesParam;
        const updatedClassAssignments: Record<string, Student[]> = {};

        // Initialize arrays for each class
        for (let i = 0; i < totalClasses; i++) {
            const className = `Class ${i + 1}`;
            updatedClassAssignments[className] = [];
        }

        // Distribute male students
        for (let i = 0; i < maleStudents.length; i++) {
            const className = `Class ${i % totalClasses + 1}`;
            updatedClassAssignments[className].push(maleStudents[i]);
            console.log(`Assigned male student ${maleStudents[i].student_name} to ${className}`);
        }



        // Distribute remaining female students
        femaleStudents.forEach((student, index) => {
            const className = `Class ${index % totalClasses + 1}`;
            updatedClassAssignments[className].push(student);
            console.log(`Assigned female student ${student.student_name} to ${className}`);
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
        // Dynamically generate class assignments based on numClassesParam
        const updatedClassAssignments: Record<string, Student[]> = {};
        for (let i = 0; i < numClassesParam; i++) {
            const className = `Class ${i + 1}`;
            updatedClassAssignments[className] = [];
        }

        setClassAssignments(updatedClassAssignments);
        fetchStudents();

        setShowStudents(true);
        console.log('Class Assignments:', updatedClassAssignments);

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

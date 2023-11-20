import React, { useState, useEffect } from 'react';
import { getStudents } from '../../services/studentService';
import { Student } from '../../types/student';
import Link from 'next/link';

export default function StudentTable() {
    const [students, setStudents] = useState<Student[]>([]);
    const [classAssignments, setClassAssignments] = useState({
        ClassA: [],
        ClassB: [],
        // ... add more class areas as needed
    });
    const [showStudents, setShowStudents] = useState(true);

    const fetchStudents = async () => {
        try {
            const studentsData = await getStudents();
            setStudents(studentsData);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleAutomatedAssignment = () => {
        const maleStudents = students.filter(student => student.gender === 'Male');
        const femaleStudents = students.filter(student => student.gender === 'Female');

        const totalClasses = Object.keys(classAssignments).length;
        const totalStudents = students.length;

        // Calculate the number of students each class should have
        const studentsPerClass = Math.floor(totalStudents / totalClasses);

        // Create an array of classes with empty student arrays
        const updatedClassAssignments: Record<string, Student[]> = {};
        for (let i = 0; i < totalClasses; i++) {
            updatedClassAssignments[`Class${i + 1}`] = [];
        }

        // Distribute male students
        for (let i = 0; i < maleStudents.length; i++) {
            const className = `Class${(i % totalClasses) + 1}`;
            updatedClassAssignments[className].push(maleStudents[i]);
        }

        // Distribute female students
        for (let i = 0; i < femaleStudents.length; i++) {
            const className = `Class${(i % totalClasses) + 1}`;
            updatedClassAssignments[className].push(femaleStudents[i]);
        }

        // Validate and adjust class assignments
        const classNames = Object.keys(updatedClassAssignments);
        const firstClass = updatedClassAssignments[classNames[0]];

        for (let i = 1; i < classNames.length; i++) {
            const currentClass = updatedClassAssignments[classNames[i]];

            while (firstClass.length > studentsPerClass && currentClass.length < studentsPerClass) {
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
        setClassAssignments({
            ClassA: [],
            ClassB: [],
            // ... initialize other class areas as needed
        });
        setShowStudents(true);
    };



    const handleOnDrag = (e, studentId) => {
        e.dataTransfer.setData('studentId', studentId.toString());
    };

    const handleOnDrop = (e, className) => {
        e.preventDefault();
        const studentId = e.dataTransfer.getData('studentId');
        const student = students.find(student => student.id.toString() === studentId);

        if (student) {
            const updatedClassAssignments = { ...classAssignments };
            const previousClass = Object.keys(updatedClassAssignments).find(
                key => updatedClassAssignments[key].some(s => s.id.toString() === studentId)
            );

            if (previousClass && previousClass !== className) {
                updatedClassAssignments[previousClass] = updatedClassAssignments[previousClass].filter(
                    s => s.id.toString() !== studentId
                );
            }

            updatedClassAssignments[className] = [...updatedClassAssignments[className], student];
            setClassAssignments(updatedClassAssignments);
        }
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleToggleStudents = () => {
        setShowStudents(prevShowStudents => !prevShowStudents);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

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
                        {classAssignments[className].map(student => (
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
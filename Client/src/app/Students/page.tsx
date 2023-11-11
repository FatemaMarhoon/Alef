'use client'
import React, { useState, useEffect } from 'react';
import { getStudents } from '../../Services/studentService'; // Import the student service
import { Student } from '../../types/Student';

export default function StudentTable() {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const studentsData = await getStudents();
                setStudents(studentsData);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }

        fetchStudents();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                Students
            </h4>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark-bg-meta-4">
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Preschool ID
                            </th>
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Student Name
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Date of Birth
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
                                <td className="border-b border-eee py-5 px-4 pl-9 dark-border-strokedark xl-pl-11">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {student.preschool_id}
                                    </h5>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {student.student_name}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {new Date(student.DOB).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {student.CPR}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {student.contact_number1}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {student.contact_number2}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {student.guardian_name}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {new Date(student.enrollment_date).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
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
    );
}

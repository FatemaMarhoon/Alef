import { getStaff } from '@/services/staffService';
import { getStudents } from '@/services/studentService';
import { Staff } from '@/types/staff';
import { Student } from '@/types/student';
import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

interface GeneratedReportProps {


    includeStudents: boolean;
    includeStaff: boolean;
    students: Student[];
    staff: Staff[];
}
const GeneratedReport: React.FC<GeneratedReportProps> = ({ includeStudents, includeStaff, students, staff }) => {

    return (
        <div className="report-container">
            <header>
                <h1 className="report-title">General Document</h1>
            </header>
            <br></br>
            {includeStudents && (
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
            )}

            {includeStaff && (
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark-bg-meta-4">
                                <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                    ID
                                </th>
                                <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                    Name
                                </th>
                                <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                    Role
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark-text-white">
                                    CPR
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark-text-white">
                                    Phone
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark-text-white">
                                    Hire Date
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark-text-white">
                                    Email
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {staff.map((staffMember, key) => (<tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.id}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {staffMember.staff_role_name}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.CPR}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.phone}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {new Date(staffMember.hire_date).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.email || 'N/A'}
                                    </p>
                                </td>

                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
        .report-container {
          font-size: 16px;
          max-width: 750px;

          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .report-title {
          font-size: 30px;
          margin-bottom: 10px;
          text-align: center;
          color: #333;
        }

      
        footer {
          text-align: center;
        }
      `}</style>
        </div>
    );
};


export default GeneratedReport;

// Import necessary modules and components
'use client';
import React, { useState, useEffect } from 'react';
import { getClasses } from '../../services/classService'; // Import the class service
import { Class } from '../../types/class';
import Link from 'next/link';
import { getStaff } from '@/services/staffService'; // Add the actual service function
import { Staff } from '../../types/staff';
// Functional component for viewing class details
export default function ClassTable() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    useEffect(() => {
        // Fetch class data when the component mounts
        async function fetchClasses() {
            try {
                const classesData = await getClasses();
                setClasses(classesData);

                // Fetch staff information based on staff_id
                const staffInfo = await getStaff();
                setStaff(staffInfo);
                console.log('staffInfo:', staffInfo);
                // setStaffName(staffInfo ? staffInfo.name : 'Unknown');
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }

        fetchClasses();
    }, []);

    const getStaffName = (staffId: number): string => {
        if (!Array.isArray(staff)) {
            console.error('Staff is not an array:', staff);
            return 'Unknown';
        }

        const staffName = staff.find(item => item.id === staffId);

        console.log('staff:', staff);
        console.log('staffId:', staffId);
        console.log('staffName:', staffName);

        return staffName ? staffName.name : 'Unknown';
    };



    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">

            <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                Classes Management
            </h4>
            <div className="flex justify-end mb-4">
                <Link href="/classes/create"
                    className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                    Add new class
                </Link>
            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark-bg-meta-4">
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Class ID
                            </th>
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Class Name
                            </th>
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Supervisor
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Grade
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Capacity
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Classroom
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classItem, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {classItem.id}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {classItem.class_name}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {getStaffName(parseInt(classItem.supervisor))}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {classItem.grade}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {classItem.capacity}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {classItem.classroom}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary">
                                            <Link href={`/classes/view/${classItem.preschool_id}`}>
                                                View
                                            </Link>
                                        </button>
                                        <button className="hover:text-primary">
                                            <Link href={`/classes/edit/${classItem.preschool_id}`}>
                                                Edit
                                            </Link>
                                        </button>
                                        <button className="hover:text-primary">
                                            <Link href={`/classes/delete/${classItem.preschool_id}`}>
                                                Delete
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
    );
}

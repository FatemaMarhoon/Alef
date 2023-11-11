'use client'
import React, { useState, useEffect } from 'react';
import { getStaff } from '../../services/staffService'; // Import the staff service
import { Staff } from '../../types/staff';

export default function StaffTable() {
    const [staff, setStaff] = useState<Staff[]>([]);

    useEffect(() => {
        async function fetchStaff() {
            try {
                const staffData = await getStaff();
                setStaff(staffData);
            } catch (error) {
                console.error('Error fetching staff:', error);
            }
        }

        fetchStaff();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                Staff
            </h4>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark-bg-meta-4">
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Staff Role Name
                            </th>
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Name
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
                        {staff.map((staffMember, key) => (
                            <tr key={key}>
                                <td className="border-b border-eee py-5 px-4 pl-9 dark-border-strokedark xl-pl-11">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {staffMember.staff_role_name}
                                    </h5>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.name}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.CPR}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.phone}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.hire_date.toString()}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {staffMember.email || 'N/A'}
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

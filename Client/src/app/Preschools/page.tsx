'use client'
import React, { useState, useEffect } from 'react';
import { getPreschools } from '../../Services/preschoolService'; // Import the preschool service
import { Preschool } from '../../types/Preschool';
import TableThree from '@/components/Tables/TableThree';

export default function PreschoolTable() {
    const [preschools, setPreschools] = useState<Preschool[]>([]);

    useEffect(() => {
        async function fetchPreschools() {
            try {
                const preschoolsData = await getPreschools();
                setPreschools(preschoolsData);
            } catch (error) {
                console.error('Error fetching preschools:', error);
            }
        }

        fetchPreschools();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                Preschools
            </h4>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark-bg-meta-4">
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Preschool Name
                            </th>
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Plan ID
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Subscription Expiry Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {preschools.map((preschool, key) => (
                            <tr key={key}>
                                <td className="border-b border-eee py-5 px-4 pl-9 dark-border-strokedark xl-pl-11">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {preschool.preschool_name}
                                    </h5>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {preschool.plan_id || 'N/A'}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {preschool.subscription_expiry_date ? new Date(preschool.subscription_expiry_date).toLocaleDateString() : 'N/A'}
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

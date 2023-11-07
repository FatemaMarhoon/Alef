'use client'
import React, { useState, useEffect } from 'react';
import { getRequests } from '../../Services/requestsService'; // Import the request service
import { Request } from '../../types/Request';

export default function RequestTable() {
    const [requests, setRequests] = useState<Request[]>([]);

    useEffect(() => {
        async function fetchRequests() {
            try {
                const requestsData = await getRequests();
                setRequests(requestsData);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        }

        fetchRequests();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                Requests
            </h4>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark-bg-meta-4">
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Status
                            </th>
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Preschool Name
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Representative Name
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                CR
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Phone
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, key) => (
                            <tr key={key}>
                                <td className="border-b border-eee py-5 px-4 pl-9 dark-border-strokedark xl-pl-11">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {request.status}
                                    </h5>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.preschool_name}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.representitive_name}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.CR}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.phone}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.email}
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

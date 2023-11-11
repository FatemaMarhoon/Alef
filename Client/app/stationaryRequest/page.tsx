'use client'
import React, { useState, useEffect } from 'react';
import { getStationaryRequests } from '../../services/stationaryRequestService';
import { getStationary } from '../../services/stationaryService';
import { StationaryRequest } from '../../types/stationaryRequest';
import { Stationary } from '../../types/stationary';
export default function StationaryRequestTable() {
    const [stationaryRequests, setStationaryRequests] = useState<StationaryRequest[]>([]);
    const [stationaries, setStationaries] = useState<Stationary[]>([]);

    useEffect(() => {
        async function fetchStationaryRequests() {
            try {
                const stationaryRequestsData = await getStationaryRequests();
                setStationaryRequests(stationaryRequestsData);

                // Fetch the list of stationary items
                const stationariesData = await getStationary();
                setStationaries(stationariesData);
            } catch (error) {
                console.error('Error fetching stationary requests:', error);
            }
        }

        fetchStationaryRequests();
    }, []);
    //function to get stationary name
    const getStationaryName = (stationaryId: number): string => {
        const stationary = stationaries.find(item => item.id === stationaryId);
        return stationary ? stationary.stationary_name : 'Unknown';
    };
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                Stationary Requests
            </h4>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark-bg-meta-4">
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Status Name
                            </th>
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Staff ID
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Stationary Name
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Requested Quantity
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Notes
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stationaryRequests.map((request, key) => (
                            <tr key={key}>
                                <td className="border-b border-eee py-5 px-4 pl-9 dark-border-strokedark xl-pl-11">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {request.status_name}
                                    </h5>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.staff_id}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {getStationaryName(request.stationary_id)}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.requested_quantity}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.notes || 'N/A'}
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

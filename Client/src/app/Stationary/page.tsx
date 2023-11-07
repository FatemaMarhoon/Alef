'use client'
import React, { useState, useEffect } from 'react';
import { getStationary } from '../../Services/stationaryService'; // Import the stationary service
import { Stationary } from '../../types/Stationary';

export default function StationaryTable() {
    const [stationaries, setStationaries] = useState<Stationary[]>([]);

    useEffect(() => {
        async function fetchStationaries() {
            try {
                const stationariesData = await getStationary();
                setStationaries(stationariesData);
            } catch (error) {
                console.error('Error fetching stationaries:', error);
            }
        }

        fetchStationaries();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                Stationaries
            </h4>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark-bg-meta-4">
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Stationary Name
                            </th>
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Quantity Available
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stationaries.map((stationary, key) => (
                            <tr key={key}>
                                <td className="border-b border-eee py-5 px-4 pl-9 dark-border-strokedark xl-pl-11">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {stationary.s}
                                    </h5>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {stationary.quantity_available}
                                    </p>
                                </td>
                                <td className="border-b border-eee py-5 px-4 dark-border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover-text-primary">
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {/* Insert your icon path here */}
                                            </svg>
                                        </button>
                                        <button className="hover-text-primary">
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {/* Insert your icon path here */}
                                            </svg>
                                        </button>
                                        <button className="hover-text-primary">
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {/* Insert your icon path here */}
                                            </svg>
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

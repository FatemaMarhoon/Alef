'use client'
import React, { useState, useEffect } from 'react';
import { Log } from '@/types/log';
import TableThree from '@/components/Tables/TableThree';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Loader from "@/components/common/Loader"; // Import the Loader component
import Access from "@/components/Pages/403"; // Import the Loader component

import Link from 'next/link';
import { currentUserRole } from '@/services/authService';
import router from 'next/navigation';
import { getLogs } from '@/services/logService';
import { log } from 'console';
export default function LogsTable() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [loading, setLoading] = useState(true);
    const [role, SetRole] = useState('');

    useEffect(() => {
        async function fetchLogs() {
            try {
                const logsData = await getLogs();
                setLogs(logsData);
                // Set loading to false once data is fetched
                setLoading(false);
            } catch (error) {
                // Set loading to false once data is fetched
                setLoading(false);
                console.error('Error fetching logs:', error);
            }
        }

        fetchLogs();
    }, []);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLogs = logs.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber);
    }




    const checkAuthorization = async () => {
        try {
            const user = await currentUserRole();
            SetRole(user);
            return user; // Return the user role
        } catch (error) {
            console.error('Error checking authorization:', error);
        }
    };

    useEffect(() => {
        // Call the function to check authorization when the component mounts or when user changes
        checkAuthorization();
    }, []); // The empty dependency array means this useEffect runs once when the component mounts

    return (
        <>
            {loading && <Loader />}
            {!loading && role !== 'Super Admin' && <Access />}
            {!loading && role === 'Super Admin' && (

                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                        Logs
                    </h4>

                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark-bg-meta-4">
                                    <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                        No
                                    </th>

                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Type
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Original Values                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Current Values                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Timestamp                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentLogs.map((log, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <h5 className="font-medium text-black dark-text-white">
                                                {key + 1}
                                            </h5>
                                        </td>

                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {log.type}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {log.original_values}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {log.current_values}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {log.timestamp}
                                            </p>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {logs.length === 0 && (
                        <div className="text-center text-gray-700 dark:text-gray-300 mt-4">
                            No Logs found.
                        </div>
                    )}
                    <div className="flex justify-end mt-4">
                        <Pagination
                            count={Math.ceil(logs.length / itemsPerPage)}
                            page={currentPage}
                            onChange={paginate}
                        // shape="rounded"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
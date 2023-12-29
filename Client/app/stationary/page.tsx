'use client'
import React, { useState, useEffect } from 'react';
import { getStationary } from '../../services/stationaryService'; // Import the stationary service
import { Stationary } from '../../types/stationary';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import { useSuccessMessageContext } from '../../components/SuccessMessageContext';
import SuccessAlert from '@/components/SuccessAlert';
import Loader from "@/components/common/Loader"; // Import the Loader component

export default function StationaryTable() {
    const [stationaries, setStationaries] = useState<Stationary[]>([]);
    const [filteredStationaries, setFilteredStationaries] = useState<Stationary[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5);
    const { successMessage, clearSuccessMessage } = useSuccessMessageContext();
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        async function fetchStationaries() {
            try {
                const stationariesData = await getStationary();
                setStationaries(stationariesData);
                setLoading(false); // Set loading to false once data is fetched

            } catch (error) {
                console.error('Error fetching stationaries:', error);
                setLoading(false); // Set loading to false once error occured

            }
        }

        fetchStationaries();
        console.log("Message on Stationary load: ", successMessage);
    }, []);


    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const filtered = stationaries.filter((stationary) =>
            stationary.stationary_name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredStationaries(filtered);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = filteredStationaries.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems = searchTerm ? filteredStationaries : stationaries;

    const paginate = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber);
    }
    return (
        <>
            {loading && <Loader />}
            {successMessage && <SuccessAlert message={successMessage} />}
            {!loading && (
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                        Stationaries
                    </h4>
                    <div className="flex justify-end mb-4">

                        <Link href="/stationary/create"
                            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                            Add new stationary

                        </Link>
                    </div>
                    <div className="flex justify-between mb-4">
                        <TextField
                            label="Search by Stationary Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
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
                                {currentItems.map((stationary, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <h5 className="font-medium text-black dark-text-white">
                                                {stationary.stationary_name}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {stationary.quantity_available}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                {/* <button className="hover:text-primary">
                                                    <Link href={`/stationary/view/${stationary.id}`}>
                                                        View
                                                    </Link>
                                                </button> */}
                                                </button>
                                                <p>|</p>
                                                <button className="hover:text-primary">
                                                    <Link href={`/stationary/edit/${stationary.id}`}>
                                                        Edit
                                                    </Link>
                                                </button>
                                                <p>|</p>
                                                <button className="hover:text-primary">
                                                    <Link href={`/stationary/delete/${stationary.id}`}>
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
                    {currentItems.length === 0 && (
                        <div className="text-center text-gray-700 dark:text-gray-300 mt-4">
                            No Stationaries found.
                        </div>
                    )}
                    <div className="flex justify-end mt-4">
                        <Pagination
                            count={Math.ceil(currentItems.length / itemsPerPage)}
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

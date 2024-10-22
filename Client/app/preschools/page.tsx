'use client'
import React, { useState, useEffect } from 'react';
import { getPreschools } from '../../services/preschoolService'; // Import the preschool service
import { Preschool } from '../../types/preschool';
import TableThree from '@/components/Tables/TableThree';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Loader from "@/components/common/Loader"; // Import the Loader component
import Access from "@/components/Pages/403"; // Import the Loader component

import Link from 'next/link';
import { currentUserRole } from '@/services/authService';
import router from 'next/navigation';
export default function PreschoolTable() {
    const [preschools, setPreschools] = useState<Preschool[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [role, SetRole] = useState('');

    useEffect(() => {
        async function fetchPreschools() {
            try {
                const preschoolsData = await getPreschools();
                setPreschools(preschoolsData);
                // Set loading to false once data is fetched
                setLoading(false);
            } catch (error) {
                // Set loading to false once data is fetched
                setLoading(false);
                console.error('Error fetching preschools:', error);
            }
        }

        fetchPreschools();
    }, []);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const paginate = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber);
    }
    // Filter the preschools based on the search term
    const filterdPreschools = preschools.filter((preschool) =>
        preschool.preschool_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentPreschools = filterdPreschools.slice(indexOfFirstItem, indexOfLastItem);


    const checkAuthorization = async () => {
        try {
            const user = await currentUserRole();
            SetRole(user as string);
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
                        Preschools
                    </h4>
                    <div className="flex justify-between mb-4">
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to the first page when searching
                            }}
                            className="mb-4"
                        />

                    </div>
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark-bg-meta-4">
                                    <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                        Preschool Name
                                    </th>

                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Subscription Expiry Date
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Minimum Age
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Maximum Age
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Monthly fees
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Cirriculum
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Registration Fees
                                    </th>
                                    <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                        Plan ID
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Request ID
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPreschools.map((preschool, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <h5 className="font-medium text-black dark-text-white">
                                                {preschool.preschool_name}
                                            </h5>
                                        </td>

                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {preschool.subscription_expiry_date ? new Date(preschool.subscription_expiry_date).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {preschool.minimum_age || 'N/A'}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {preschool.maximum_age || 'N/A'}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {preschool.monthly_fees || 'N/A'}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {preschool.cirriculum || 'N/A'}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {preschool.registration_fees || 'N/A'}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {preschool.plan_id || 'N/A'}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {preschool.request_id || 'N/A'}
                                            </p>
                                        </td>
                                        <td>   <button className="hover:text-primary">
                                            <Link prefetch={false} href={`/profile/${preschool.id}`}>
                                                Edit
                                            </Link>
                                        </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {preschools.length === 0 && (
                        <div className="text-center text-gray-700 dark:text-gray-300 mt-4">
                            No Preschools found.
                        </div>
                    )}
                    <div className="flex justify-end mt-4">
                        <Pagination
                            count={Math.ceil(preschools.length / itemsPerPage)}
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
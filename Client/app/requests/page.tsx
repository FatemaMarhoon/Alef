'use client'
import React, { useState, useEffect } from 'react';
import { getRequests } from '../../services/requestService'; // Import the request service
import { Request } from '../../types/request';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function RequestTable() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();

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

    // const handleReviewApplication = (requestId: string) => {
    //     // Handle the review application logic
    //     router.push(`/review/${requestId}`);

    //     console.log(`Review application for request ID: ${requestId}`);
    // };

    const filteredRequests = requests.filter(
        (request) =>
            request.preschool_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedStatus ? request.status === selectedStatus : true)
    );

    const statuses = Array.from(new Set(requests.map((request) => request.status)));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                Requests
            </h4>

            <div className="flex justify-between mb-4">
                <TextField
                    label="Search by Preschool Name"
                    variant="outlined"
                    size="small"

                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    style={{ width: '80%', justifyContent: 'flex-end' }}
                />

                <FormControl variant="outlined" size="small" style={{ minWidth: '150px' }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={selectedStatus}
                        onChange={(e) => {
                            setSelectedStatus(e.target.value as string);
                            setCurrentPage(1);
                        }}
                        label="Status"
                    >
                        <MenuItem value="">All</MenuItem>
                        {statuses.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark-bg-meta-4">
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Request ID
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
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Status
                            </th>
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.id}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.preschool_name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.representitive_name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.CR}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.phone}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {request.email}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {/* <h5 className="font-medium text-black dark-text-white">
                                        {request.status}
                                    </h5> */}
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                                          ${request.status === "Accepted" || request.status === "Approved"
                                                ? "text-success bg-success"
                                                : request.status === "Rejected" || request.status === "Cancelled"
                                                    ? "text-danger bg-danger"
                                                    : request.status === "Pending"
                                                        ? "text-warning bg-warning"
                                                        : "text-black bg-bodydark"
                                            }`}
                                    >
                                        {request.status}
                                    </p>
                                </td>
                                {/* Actions Column */}
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <button className="bg-primary text-white px-3 py-1 rounded-md" >
                                        <Link href={`/requests/review/${request.id}`}>

                                            {/* // onClick={() => handleReviewApplication(request.id.toString())} */}

                                            Review
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-4">
                <Pagination
                    count={Math.ceil(filteredRequests.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                />
            </div>
        </div >
    );
}

'use client'
import React, { useState, useEffect } from 'react';
import { getApplications, deleteApplication } from '@/services/applicationsService';
import Link from 'next/link';
import { useSuccessMessageContext } from '../../components/SuccessMessageContext';
import { useRouter } from 'next/navigation';
import { Application } from '../../types/application'
import SuccessAlert from '@/components/SuccessAlert';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { StaticValue } from '@/types/staticValue';
import { getApplicationStatuses } from '@/services/staticValuesService';
import { PencilIcon } from '@heroicons/react/20/solid';
import { Delete, Edit } from '@mui/icons-material';

export default function ApplicationsTable() {
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setsSelectedStatus] = useState("");
    const [statuses, setStatuses] = useState<StaticValue[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { successMessage } = useSuccessMessageContext();

    useEffect(() => {
        async function fetchApplications() {
            try {
                const response = await getApplications();
                const sortedApplicationsList = response.data.sort((a: Application, b: Application) => {
                    // Convert the date strings to Date objects for comparison
                    const dateA = new Date(a.updatedAt);
                    const dateB = new Date(b.updatedAt);

                    // Compare the dates
                    return dateA.getTime() - dateB.getTime();
                });

                setApplications(sortedApplicationsList);

            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        }
        fetchApplications();
        console.log("Message on Applications load: ", successMessage);
    }, [successMessage]);

    useEffect(() => {
        async function fetchStatuses() {
            try {
                const statuses = await getApplicationStatuses();
                setStatuses(statuses);
            } catch (error: any) {
                console.error('Error fetching statuses:', error);
            }
        };
        fetchStatuses();
    }, [])

    async function handleDelete(id: number) {
        try {
            if (confirm("Are you sure you want to delete user permenintaly?")) {
                await deleteApplication(id);
                router.refresh();
            }

        }
        catch (error: any) {
            console.error('Error deleting:', error);
        }
    }

    // Filter the applications based on the search term
    const filteredApplications = applications.filter(application =>
        application.student_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedStatus === '' || application.status === selectedStatus)
    );

    // Calculate the indexes for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentApplications = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <>
            {successMessage && <SuccessAlert message={successMessage} />}
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white sm-px-7.5 xl-pb-1">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Applications
                </h4>
                <div className="flex justify-end mb-4">
                    <Link href="/applications/create"
                        className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                        Add new Application
                    </Link>
                </div>
                <div className="flex justify-between mb-4">
                    <TextField
                        label="Search by Student Name"
                        variant="outlined"
                        size="small"
                        style={{ width: '69%' }}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <FormControl variant="outlined" size="small" style={{ width: '29%' }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={selectedStatus}
                            onChange={(e) => {
                                setsSelectedStatus(e.target.value as string);
                                setCurrentPage(1);
                            }}
                            label="Status"
                        >
                            <MenuItem value="">All</MenuItem>
                            {statuses.map((status) => (
                                <MenuItem key={status.ValueName} value={status.ValueName}>
                                    {status.ValueName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-220px py-4 px-4 text-center font-medium text-black dark:text-white xl-pl-11">
                                    ID
                                </th>
                                <th className="min-w-150px py-4 px-4 text-center font-medium text-black dark:text-white">
                                    Applicant Name
                                </th>
                                <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                                    Date of Birth
                                </th>
                                <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                                    CPR
                                </th>
                                <th className="py-4 px-4 font-medium text-center text-black dark:text-white">

                                    Status
                                </th>
                                <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                                    Submitted By
                                </th>
                                <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(currentApplications) && currentApplications.map((application, key) => (<tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {application.id}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                    <p className="text-black dark:text-white">
                                        {application.student_name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                    <p className="text-black dark:text-white">
                                        {new Date(application.student_DOB).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                    <p className="text-black dark:text-white">
                                        {application.student_CPR}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium dark:bg-opacity-25
                                            ${application.status === "Accepted"
                                                ? "text-success bg-success dark:bg-success"
                                                : application.status === "Rejected" || application.status === "Cancelled"
                                                    ? "text-danger bg-danger"
                                                    : application.status === "Waitlist"
                                                        ? "text-warning bg-warning"
                                                        : "text-black bg-bodydark dark:text-white dark:text-opacity-70"
                                            }`}
                                    >
                                        {application.status}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                    <p className="text-black dark:text-white">
                                        {application.User?.name}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary">
                                            <Link href={`/applications/${application.id}`}>
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(application.id)}
                                            className="hover:text-primary">
                                            <Delete></Delete>
                                        </button>
                                        {/* <button className="hover:text-primary"> */}
                                        {/* <IconButton> */}
                                        <Link href={`/applications/edit/${application.id}`}>
                                            {/* <PencilIcon color='error' /> */}
                                        </Link>
                                        {/* </IconButton> */}
                                        <button className='hover:text-primary'>
                                            <Link href={`/applications/edit/${application.id}`}>
                                            <Edit></Edit>
                                            </Link>
                                        </button>

                                        {/* </button> */}
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredApplications.length === 0 && (
                    <div className="text-center text-gray-700 dark:text-gray-300 mt-4">
                        No Applications Found.
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <Pagination
                        count={Math.ceil(filteredApplications.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                    // color="primary"
                    />
                </div>
            </div>
        </>
    );
}

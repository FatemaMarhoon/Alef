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

export default function ApplicationsTable() {
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setsSelectedStatus] = useState("");
    const [statuses, setStatuses] = useState<StaticValue[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { setSuccessMessage, successMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");

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
            if (confirm("Are you sure you want to delete application permenintaly?")) {
                const response = await deleteApplication(id);
                if (response.status == 200 || response.status == 201) {
                    setSuccessMessage(response.data.message);
                    router.refresh();
                }
                else if (response.status == 404 || response.status == 400 || response.status == 500) {
                    setError(response.data.message);
                }
            }
        }
        catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
            else if (error.message) {
                setError(error.message);
            }
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
                                                View
                                            </Link>
                                        </button>
                                        <p> |</p>
                                        <button
                                            onClick={() => handleDelete(application.id)}
                                            className="hover:text-primary">
                                            Delete
                                        </button>
                                        <p> |</p>

                                        <button className='hover:text-primary'>
                                            <Link href={`/applications/edit/${application.id}`}>
                                                Edit
                                            </Link>
                                        </button>

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

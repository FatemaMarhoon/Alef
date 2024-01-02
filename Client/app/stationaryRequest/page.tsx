'use client'
import React, { useState, useEffect } from 'react';
import { getStationaryRequests } from '../../services/stationaryRequestService';
import { getStationary } from '../../services/stationaryService';
import { StationaryRequest } from '../../types/stationaryRequest';
import { Stationary } from '../../types/stationary';
import { Staff } from '../../types/staff';
import { Class } from '../../types/class';

import Link from 'next/link';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSuccessMessageContext } from '../../components/SuccessMessageContext';
import SuccessAlert from '@/components/SuccessAlert';
import { getStaff } from '@/services/staffService';
import { getClasses } from '@/services/classService';
import Loader from "@/components/common/Loader"; // Import the Loader component

export default function StationaryRequestTable() {
    const [stationaryRequests, setStationaryRequests] = useState<StationaryRequest[]>([]);
    const [stationaries, setStationaries] = useState<Stationary[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>(''); // New state for status filtering
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { successMessage, clearSuccessMessage } = useSuccessMessageContext();
    const [itemsPerPage] = useState<number>(5);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        async function fetchStationaryRequests() {
            try {
                const stationaryRequestsData = await getStationaryRequests();
                setStationaryRequests(stationaryRequestsData);

                // Fetch the list of stationary items
                const stationariesData = await getStationary();
                setStationaries(stationariesData);


                // Fetch the list of staff items
                const staffData = await getStaff();
                setStaff(staffData);

                // Fetch the list of staff items
                const classesData = await getClasses();
                setClasses(classesData);
                setLoading(false); // Set loading to false once data is fetched

            } catch (error) {
                console.error('Error fetching stationary requests:', error);
                setLoading(false); // Set loading to false in case of an error

            }
        }

        fetchStationaryRequests();
        console.log("Message on Stationary Requests load: ", successMessage);

    }, [successMessage]);

    //function to get stationary name
    const getStationaryName = (stationaryId: number): string => {
        const stationary = stationaries.find(item => item.id === stationaryId);
        return stationary ? stationary.stationary_name : 'Unknown';
    };

    // Function to get class name
    const getClassName = (classId: number): string => {
        const selectedClass = classes.find(item => item.id === classId);
        return selectedClass ? selectedClass.class_name : 'Unknown';
    };

    // Function to get staff name
    const getStaffName = (staffId: number): string => {
        const staffMember = staff.find(item => item.id === staffId);
        return staffMember ? staffMember.name : 'Unknown';
    };

    const filteredRequests = stationaryRequests.filter(request =>
        (statusFilter === '' || request.status_name.toLowerCase() === statusFilter.toLowerCase()) &&

        getStationaryName(request.stationary_id).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const paginate = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber);
    }
    const handleStatusFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value as string;
        setStatusFilter(selectedValue);
        setPage(0);
    };


    return (
        <>
            {loading && <Loader />}
            {successMessage && <SuccessAlert message={successMessage} />}
            {!loading && (
                < div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                        Stationary Requests
                    </h4>
                    {/* <div className="flex justify-end mb-4">

                    <Link href="/stationaryRequest/create"
                        className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                        Add new stationary

                    </Link>
                </div> */}
                    <div className="flex justify-between mb-4">
                        <TextField
                            label="Search by Stationary Name"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{ width: '80%', justifyContent: 'flex-end' }}
                        />

                        <FormControl variant="outlined" size="small" style={{ minWidth: '150px' }}>
                            <InputLabel id="status-filter-label">Status</InputLabel>
                            <Select
                                labelId="status-filter-label"
                                id="status-filter"
                                value={statusFilter}
                                // onChange={handleStatusFilterChange}
                                label="Status"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {/* Replace the next line with your actual status options */}
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </Select>
                        </FormControl>

                    </div>
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark-bg-meta-4">

                                    <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                        Staff
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Stationary Name
                                    </th>
                                    <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                        Class
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Requested Quantity
                                    </th>
                                    <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                        Status
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Notes
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark-text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((request, key) => (
                                    <tr key={key}>

                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {getStaffName(request.staff_id)}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {getStationaryName(request.stationary_id)}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {getClassName(request.class_id)}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {request.requested_quantity}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <h5 className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
            ${request.status_name === "Approved"
                                                    ? "text-success bg-success"
                                                    : request.status_name === "Rejected" || request.status_name === "Cancelled"
                                                        ? "text-danger bg-danger"
                                                        : request.status_name === "Waitlist"
                                                            ? "text-warning bg-warning"
                                                            : "text-black bg-bodydark"
                                                }`}
                                            >
                                                {request.status_name}
                                            </h5>
                                        </td>

                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark-text-white">
                                                {request.notes || 'N/A'}
                                            </p>
                                        </td>


                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <button className="bg-primary text-white px-3 py-1 rounded-md">
                                                <Link href={`/stationaryRequest/edit/${request.id}`}>
                                                    Review
                                                </Link>
                                            </button>
                                            {/* |
                                            <button className="bg-danger text-white px-3 py-1 rounded-md mr-4">
                                                <Link href={`/stationaryRequest/edit/${request.id}`}>
                                                    Delete
                                                </Link>
                                            </button> */}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredRequests.length === 0 && (
                        <div className="text-center text-gray-700 dark:text-gray-300 mt-4">
                            No Requests found.
                        </div>
                    )}
                    <div className="flex justify-end mt-4">
                        <Pagination
                            count={Math.ceil(filteredRequests.length / itemsPerPage)}
                            page={currentPage}
                            onChange={paginate}
                        // shape="rounded"
                        />
                    </div>
                </div >
            )}
        </>
    );
}
function setPage(arg0: number) {
    throw new Error('Function not implemented.');
}


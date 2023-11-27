// Import necessary modules and components
'use client';
import React, { useState, useEffect } from 'react';
import { getClasses } from '../../services/classService'; // Import the class service
import { Class } from '../../types/class';
import Link from 'next/link';
import { getStaff } from '@/services/staffService'; // Add the actual service function
import { Staff } from '../../types/staff';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// Functional component for viewing class details
export default function ClassTable() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedSupervisor, setSelectedSupervisor] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        // Fetch class data when the component mounts
        async function fetchClasses() {
            try {
                const classesData = await getClasses();
                setClasses(classesData);

                // Fetch staff information based on staff_id
                const staffInfo = await getStaff();
                setStaff(staffInfo);
                console.log('staffInfo:', staffInfo);
                // setStaffName(staffInfo ? staffInfo.name : 'Unknown');
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }

        fetchClasses();
    }, []);

    const getStaffName = (staffId: number): string => {
        if (!Array.isArray(staff)) {
            console.error('Staff is not an array:', staff);
            return 'Unknown';
        }

        const staffName = staff.find(item => item.id === staffId);

        console.log('staff:', staff);
        console.log('staffId:', staffId);
        console.log('staffName:', staffName);

        return staffName ? staffName.name : 'Unknown';
    };


    const filteredClasses = classes.filter((classItem) =>
        classItem.class_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGrade ? classItem.grade === selectedGrade : true) &&
        (selectedSupervisor ? classItem.supervisor === parseInt(selectedSupervisor) : true)
    );

    const grades = Array.from(new Set(classes.map((classItem) => classItem.grade)));
    const supervisors = Array.from(new Set(classes.map((classItem) => classItem.supervisor)));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClasses = filteredClasses.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">

            <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                Classes Management
            </h4>
            <div className="flex justify-end mb-4">
                <Link href="/class/create"
                    className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                    Add new class
                </Link>
            </div>
            <div className="flex justify-between mb-4">
                <TextField
                    label="Search by Class Name"
                    variant="outlined"
                    size="small"

                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    style={{ width: '60%' }}
                />
                <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
                    <InputLabel>Grade</InputLabel>
                    <Select
                        value={selectedGrade}
                        onChange={(e) => {
                            setSelectedGrade(e.target.value as string);
                            setCurrentPage(1);
                        }}
                        label="Grade"
                    >
                        <MenuItem value="">All</MenuItem>
                        {grades.map((grade) => (
                            <MenuItem key={grade} value={grade}>
                                {grade}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
                    <InputLabel>Supervisor</InputLabel>
                    <Select
                        value={selectedSupervisor}
                        onChange={(e) => {
                            setSelectedSupervisor(e.target.value as string);
                            setCurrentPage(1);
                        }}
                        label="Supervisor"
                    >
                        <MenuItem value="">All</MenuItem>
                        {supervisors.map((supervisor) => (
                            <MenuItem key={supervisor} value={supervisor}>
                                {getStaffName(parseInt(supervisor))}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark-bg-meta-4">
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Class ID
                            </th>
                            <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                                Class Name
                            </th>
                            <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                                Supervisor
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Grade
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Capacity
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Classroom
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark-text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClasses.map((classItem, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {classItem.id}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark-text-white">
                                        {classItem.class_name}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {getStaffName(parseInt(classItem.supervisor))}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {classItem.grade}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {classItem.capacity}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark-text-white">
                                        {classItem.classroom}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary">
                                            <Link href={`/class/view/${classItem.id}`}>
                                                View
                                            </Link>
                                        </button>
                                        <button className="hover:text-primary">
                                            <Link href={`/class/edit/${classItem.preschool_id}`}>
                                                Edit
                                            </Link>
                                        </button>
                                        <button className="hover:text-primary">
                                            <Link href={`/class/delete/${classItem.preschool_id}`}>
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
            <div className="flex justify-end mt-4">
                <Pagination
                    count={Math.ceil(filteredClasses.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}

                // color="primary"
                />
            </div>
        </div>
    );
}

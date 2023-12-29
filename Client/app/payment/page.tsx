'use client'
import React, { useState, useEffect } from 'react';
import { deletePayment, getPayments, remindParent } from '@/services/paymentService';
import Link from 'next/link';
import { useSuccessMessageContext } from '../../components/SuccessMessageContext';
import { Payment } from '../../types/payment'
import SuccessAlert from '@/components/SuccessAlert';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import ErrorAlert from '@/components/ErrorAlert';
import { useRouter } from 'next/navigation';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getPaymentStatuses, getPaymentTypes } from '@/services/staticValuesService';
import { StaticValue } from '@/types/staticValue';

export default function PaymentTable() {
    const router = useRouter();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setsSelectedStatus] = useState("");
    const [statuses, setStatuses] = useState<StaticValue[]>([]);
    const [selectedType, setsSelectedType] = useState("");

    const [types, setTypes] = useState<StaticValue[]>([]);
    const itemsPerPage = 10;
    const { successMessage, setSuccessMessage } = useSuccessMessageContext();

    useEffect(() => {
        async function fetchPayments() {
            try {
                const response = await getPayments();
                setPayments(response);
            } catch (error: any) {
                setError(error.message)
            }
        }
        fetchPayments();
    }, [successMessage]);

    useEffect(() => {
        async function fetchStatuses() {
            try {
                const statuses = await getPaymentStatuses();
                setStatuses(statuses);
            } catch (error: any) {
                setError(error.message);
            }
        };
        async function fetchTypes() {
            try {
                const types = await getPaymentTypes();
                setTypes(types);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchStatuses();
        fetchTypes();
    }, []);

    async function handleDelete(id: number) {
        try {
            setError("");
            const response = await deletePayment(id);
            if (response.status === 201 || response.status == 200) {
                setSuccessMessage(response.data.message);
                router.refresh();
            }
            else if (response.status == 400 || response.status == 404 || response.status == 500) {
                setError(response.data.message);
            }

        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
            else if (error.message) {
                setError(error.message);
            }
        }
    }

    async function handleNotify(id: number) {
        try {
            setError("");
            const response = await remindParent(id);
            if (response.status === 201 || response.status == 200) {
                setSuccessMessage(response.data.message);
                router.refresh();
            }
            else if (response.status == 400 || response.status == 404 || response.status == 500) {
                setError(response.data.message);
            }

        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
            else if (error.message) {
                setError(error.message);
            }
        }
    }
    // const filteredPayments = payments;
    const filteredPayments = payments.filter(
        (payment) =>
            payment.Student?.student_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedStatus === '' || payment.status === selectedStatus) && (selectedType === '' || payment.type === selectedType)
    );

    // Calculate the indexes for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <>
            {successMessage && <SuccessAlert message={successMessage} />}
            {error && <ErrorAlert message={error}></ErrorAlert>}

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-pb-1">
                <h4 className="mb-6 text-xl font-semibold text-black dark-text-white">
                    Payment Records
                </h4>
                <div className="flex justify-end mb-4">
                    <Link href="/payment/create"
                        className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                        Add New Payment
                    </Link>
                </div>
                <div className="flex justify-between mb-4">
                    <TextField
                        label="Search by Student Name"
                        variant="outlined"
                        size="small"
                        style={{ width: '60%' }}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
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

                    <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={selectedType}
                            onChange={(e) => {
                                setsSelectedType(e.target.value as string);
                                setCurrentPage(1);
                            }}
                            label="Type"
                        >
                            <MenuItem value="">All</MenuItem>
                            {types.map((type) => (
                                <MenuItem key={type.ValueName} value={type.ValueName}>
                                    {type.ValueName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark-bg-meta-4">
                                <th className="min-w-220px py-4 px-4 text-center font-medium text-black dark-text-white xl-pl-11">
                                    ID
                                </th>
                                <th className="py-4 px-4 font-medium text-center text-black dark-text-white">
                                    Student
                                </th>
                                <th className="py-4 px-4 font-medium text-center text-black dark-text-white">
                                    Type
                                </th>
                                <th className="min-w-150px py-4 px-4 text-center font-medium text-black dark-text-white">
                                    Amount (BD)
                                </th>

                                <th className="py-4 px-4 font-medium text-center text-black dark-text-white">
                                    Due Date
                                </th>
                                <th className="py-4 px-4 font-medium text-center text-black dark-text-white">
                                    Status
                                </th>

                                <th className="py-4 px-4 font-medium text-center text-black dark-text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(currentPayments) && currentPayments.map((payment, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                        <h5 className="font-medium text-black dark-text-white">
                                            {payment.id}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                        <p className="text-black dark-text-white">
                                            {payment.Student?.student_name}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                        <p className="text-black dark-text-white">
                                            {payment.type}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                        <p className="text-black dark-text-white">
                                            {payment.fees}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                        <p className="text-black dark-text-white">
                                            {new Date(payment.due_date).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                                            ${payment.status === "Paid"
                                                    ? "text-success bg-success"
                                                    : payment.status === "Overdue"
                                                        ? "text-danger bg-danger"
                                                        : payment.status === "Exempted"
                                                            ? "text-warning bg-warning"
                                                            : "text-black bg-bodydark"
                                                }`}
                                        >
                                            {payment.status}
                                        </p>
                                    </td>

                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                                        <div className="flex items-center space-x-3.5">
                                            {payment.status == "Pending" && payment.Student?.user_id &&
                                                <><button onClick={() => handleNotify(payment.id)}
                                                    className="hover:text-primary">
                                                    Notify
                                                </button><p> |</p></>
                                            }

                                            <button className="hover:text-primary">
                                                <Link href={`/payment/${payment.id}`}>
                                                    View
                                                </Link>
                                            </button>
                                            <p> |</p>
                                            <button className="hover:text-primary"
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this payment permanently?")) {
                                                        handleDelete(payment.id);
                                                    }
                                                }}>
                                               Delete
                                            </button>
                                            <p> |</p>
                                            <button className="hover:text-primary">
                                                <Link href={`/payment/edit/${payment.id}`}>
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

                {filteredPayments.length === 0 && (
                    <div className="text-center text-gray-700 dark:text-gray-300 mt-4">
                        No Payment Records Found.
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <Pagination
                        count={Math.ceil(filteredPayments.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                    // color="primary"
                    />
                </div>
            </div >
        </>
    );
}

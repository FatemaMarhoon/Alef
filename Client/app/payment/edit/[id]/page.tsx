'use client'
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getPaymentById, updatePayment } from '@/services/paymentService';
import { useRouter } from 'next/navigation'
import ErrorAlert from "@/components/ErrorAlert";
import { useSuccessMessageContext } from "@/components/SuccessMessageContext";
import { Student } from "@/types/student";
import { getPaymentStatuses, getPaymentTypes } from "@/services/staticValuesService";
import { getStudents } from "@/services/studentService";
import { StaticValue } from "@/types/staticValue";
import { Payment } from "@/types/payment";


export default function EditPaymentForm({ params }: { params: { id: number } }) {
    const router = useRouter();
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");

    const [types, setTypes] = useState<StaticValue[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [statuses, setStatuses] = useState<StaticValue[]>([]);
    const [paymentData, setPaymentData] = useState<Payment>({
        id:0,
        type:"",
        status:"",
        due_date:new Date().toISOString(),
        fees:0,
        notes:"",
        paid_on: new Date().toISOString(),
        student_id:0,
        createdAt: ""
    })

    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const existingPayment = await getPaymentById(params.id);
                setPaymentData(existingPayment);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        async function fetchTypes() {
            try {
                const types = await getPaymentTypes();
                setTypes(types);
            } catch (error: any) {
                setError(error.message);
            }
        }

        async function fetchStudents() {
            try {
                const students = await getStudents();
                setStudents(students);
            } catch (error: any) {
                setError(error.message);
            }
        }

        async function fetchStatuses() {
            try {
                const statuses = await getPaymentStatuses();
                setStatuses(statuses);
            } catch (error: any) {
                setError(error.message);
            }
        }

        fetchTypes();
        fetchStudents();
        fetchPaymentData();
        fetchStatuses();

    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            if (paymentData) {
                const response = await updatePayment(paymentData);
                if (response.status === 201 || response.status == 200) {
                    setSuccessMessage(response.data.message);
                    router.push('/payment');
                }
                else if (response.status == 400 || response.status == 404 || response.status == 500) {
                    setError(response.data.message);
                }
            }

        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
            else if (error.message) {
                setError(error.message);
            }
        }
    };

    return (
        <>
            {error && <ErrorAlert message={error}></ErrorAlert>}
            <Breadcrumb pageName="Update Payment" />

            <div className="grid grid-cols-12 sm:grid-cols-2">
                <div className="col-span-12">
                    { /* FORM STARTS HERE */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Update Payment
                            </h3>
                        </div>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Type <span className="text-meta-1">*</span>
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select
                                            value={paymentData?.type}
                                            onChange={(e) => setPaymentData({ ...paymentData, type:e.target.value })}
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        >
                                            <option value="">Select Type</option>
                                            {types.map((type, index) => (
                                                <option key={index} value={type.ValueName}>
                                                    {type.ValueName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <svg
                                                className="fill-current"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill=""
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Fees <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={paymentData?.fees}
                                        onChange={(e) => setPaymentData({ ...paymentData, fees: Number(e.target.value) })}
                                        placeholder="Enter fees amount"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Due Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={ new Date(paymentData?.due_date).toISOString().split('T')[0]}
                                        onChange={(e) => setPaymentData({ ...paymentData, due_date: new Date(e.target.value).toISOString().split('T')[0]})}
                                        placeholder="Select a due date"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        For Student <span className="text-meta-1">*</span>
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select
                                            value={paymentData?.student_id}
                                            onChange={(e) => setPaymentData({ ...paymentData, student_id: Number(e.target.value) })}
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        >
                                            <option value="">Select Student</option>
                                            {students.map((student, index) => (
                                                <option key={index} value={student.id}>
                                                    {student.student_name + " - " + student.CPR}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <svg
                                                className="fill-current"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill=""
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Notes
                                    </label>
                                    <input
                                        type="text"
                                        value={paymentData?.notes}
                                        onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                                        placeholder="Enter any notes."
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Status <span className="text-meta-1">*</span>
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select
                                            value={paymentData?.status}
                                            onChange={(e) => setPaymentData({ ...paymentData, status:e.target.value })}
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        >
                                            <option value="">Select Status</option>
                                            {statuses.map((status, index) => (
                                                <option key={index} value={status.ValueName}>
                                                    {status.ValueName}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <svg
                                                className="fill-current"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill=""
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

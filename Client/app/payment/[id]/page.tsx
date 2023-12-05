'use client'
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getPaymentById } from '@/services/paymentService';
import { Payment } from '@/types/payment';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Functional component for viewing application details
export default function Page({ params }: { params: { id: number } }) {
    const router = useRouter();

    const [payment, setPayment] = useState<Payment | null>(null);

    useEffect(() => {
        // Fetch application data when the component mounts
        const fetchPaymentData = async () => {
            try {
                const existingPayment = await getPaymentById(params.id);
                setPayment(existingPayment);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        fetchPaymentData();
    }, [params.id]);


    if (!payment) {
        return null; // You can render a loading spinner or message here
    }

    return (
        <>
            <Breadcrumb pageName="View Payment" />

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Payment Details</h3>
                    </div>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Payment Status
                            </label>
                            <div><p
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
                            </p></div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Student Name
                            </label>
                            <div>{payment.Student?.student_name}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Contact Numbers
                            </label>
                            <div>{payment.Student?.contact_number1 + " - " + payment.Student?.contact_number2}</div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Type
                            </label>
                            <div>{payment.type}</div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Fees
                            </label>
                            <div>{payment.fees} BD</div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Issue Date
                            </label>
                            <div>{new Date(payment.createdAt).toISOString().split('T')[0]}</div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Due Date
                            </label>
                            <div>{new Date(payment.due_date).toISOString().split('T')[0]}</div>
                        </div>
                        {payment.paid_on && 
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Paid On
                                </label>
                                <div>{new Date(payment.paid_on).toISOString().split('T')[0]}</div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

// module.exports = viewApplication;

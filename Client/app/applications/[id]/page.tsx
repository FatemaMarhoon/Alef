'use client'
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getApplicationById, updateApplication } from '@/services/applicationsService';
import { Application } from '@/types/application';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Evaluation } from '@/types/evaluation';
import { ApplicationPOST } from '@/types/applicationPOST';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import ErrorAlert from '@/components/ErrorAlert';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
// Functional component for viewing application details
export default function Page({ params }: { params: { id: number } }) {
    const router = useRouter();

    const [application, setApplication] = useState<Application | null>(null);
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch application data when the component mounts
        const fetchApplicationData = async () => {
            try {
                const existingApplication = await getApplicationById(params.id);
                setApplication(existingApplication);
                setEvaluation(existingApplication.Application_Evaluation)
            } catch (error) {
                console.error('Error fetching application data:', error);
            }
        };

        fetchApplicationData();
    }, [params.id]);

    const handleAccept = async () => {
        try {
            const updated: ApplicationPOST = {};
            if (application) {
                updated.status = "Accepted";
                console.log(updated)
                const response = await updateApplication(application.id, updated);
                if (response.status == 200 || response.status == 201) {
                    setSuccessMessage(response.data.message);
                    router.push("/applications"); // Redirect to the applications page after submission
                }
                else if (response.status == 400 || response.status == 404 || response.status == 500) {
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
    };

    async function quickAction(newStatus: string) {
        try {
            if (confirm(`Are you sure you want to mark this application as ${newStatus}`)) {
                const updated: ApplicationPOST = {};
                if (application) {
                    updated.status = newStatus;
                    console.log(updated)
                    const response = await updateApplication(application.id, updated);
                    if (response.status == 200 || response.status == 201) {
                        setSuccessMessage(response.data.message);
                        router.push("/applications"); // Redirect to the applications page after submission
                    }
                    else if (response.status == 400 || response.status == 404 || response.status == 500) {
                        setError(response.data.message);
                    }
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

    };


    if (!application) {
        return null;
    }

    return (
        <>
            <Breadcrumbs previousName='Applications' currentName='Details' pageTitle="Application Details" previousPath='/applications' />
           
            {error && <ErrorAlert message={error}></ErrorAlert>}

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="pt-6 px-6.5">
                        {/* <h3 className="font-medium text-black dark:text-white">ِApplication Details</h3> */}
                        <div className="relative flex justify-end">
                            {evaluation === null && (
                                <div className="mr-4">
                                    <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                        <Link href={{ pathname: `/evaluation/create`, query: { id: `${application.id}` } }}>
                                            Evaluate
                                        </Link>
                                    </button>
                                </div>
                            )}

                            {evaluation && (
                                <div className="mr-4">
                                    <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                        <Link href={{ pathname: `/evaluation/${evaluation.id}`, query: { evaluation: `${evaluation}` } }}>
                                            Review Evaluation
                                        </Link>
                                    </button>
                                </div>
                            )}

                            {/* Accept Button */}
                            {evaluation && application.status === "Pending" && (
                                <div className="mr-4">
                                    <button
                                        onClick={() => quickAction("Accepted")}
                                        className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                                    >
                                        Accept
                                    </button>
                                </div>
                            )}

                            {/* Reject Button */}
                            {evaluation && application.status === "Pending" && (
                                <div className="mr-4">
                                    <button
                                        onClick={() => quickAction("Rejected")}
                                        className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}

                            {(application.status == "Pending" || application.status == "Waitlist") && (
                                <div className="mr-4">
                                    <button
                                        onClick={() => quickAction("Cancelled")}
                                        className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="p-6.5 pt-0">
                        <div>
                            <dl className="divide-y divide-stroke dark:divide-strokedark">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Application Status</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                                            ${application.status === "Accepted"
                                                ? "text-success bg-success"
                                                : application.status === "Rejected" || application.status === "Cancelled"
                                                    ? "text-danger bg-danger"
                                                    : application.status === "Waitlist"
                                                        ? "text-warning bg-warning"
                                                        : "text-black bg-bodydark  dark:text-white"
                                            }`}
                                    >
                                        {application.status}
                                    </p></dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Applicant Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{application.student_name}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Gender</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{application.gender}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Grade</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{application.grade}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Applicant DOB</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(application.student_DOB).toISOString().split('T')[0]}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Applicant CPR</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{application.student_CPR}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Application Date</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {new Date(application.createdAt).toISOString().split('T')[0]}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Guardian</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{application.guardian_name} - {application.guardian_type}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Contact</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{application.email} - {application.phone}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900  dark:text-white">Attachments</dt>
                                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 dark:border-white">
                                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6  dark:text-white">
                                                <div className="flex w-0 flex-1 items-center">
                                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-600  dark:text-white" aria-hidden="true" />
                                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                        <span className="truncate font-medium">Personal Picture</span>
                                                        {/* <span className="flex-shrink-0 text-gray-400">2.4mb</span> */}
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a href={application.personal_picture}
                                                        target="_blank" rel="noopener noreferrer"
                                                        className="font-medium text-primary">
                                                        View
                                                    </a>
                                                </div>
                                            </li>
                                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6  dark:text-white">
                                                <div className="flex w-0 flex-1 items-center">
                                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                        <span className="truncate font-medium">Certificate Of Birth</span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a href={application.certificate_of_birth}
                                                        target="_blank" rel="noopener noreferrer"
                                                        className="font-medium text-primary">
                                                        View
                                                    </a>
                                                </div>
                                            </li>
                                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 dark:text-white">
                                                <div className="flex w-0 flex-1 items-center">
                                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                        <span className="truncate font-medium">Passport</span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a href={application.passport}
                                                        target="_blank" rel="noopener noreferrer"
                                                        className="font-medium text-primary">
                                                        View
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </dd>
                                </div>
                            </dl>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

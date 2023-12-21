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
        catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
            else if (error.message) {
                setError(error.message);
            }
        }

    };

    const handleReject = async () => {
        const updated: ApplicationPOST = {};
        if (application) {
            updated.status = "Rejected";
            updateApplication(application.id, updated);
        }
    };

    if (!application) {
        return null; // You can render a loading spinner or message here
    }

    return (
        <>
            <Breadcrumb pageName="View Application" />
            {error && <ErrorAlert message={error}></ErrorAlert>}

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">ِApplication Details</h3>
                    </div>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Application Status
                            </label>
                            <div><p
                                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                                            ${application.status === "Accepted"
                                        ? "text-success bg-success"
                                        : application.status === "Rejected" || application.status === "Cancelled"
                                            ? "text-danger bg-danger"
                                            : application.status === "Waitlist"
                                                ? "text-warning bg-warning"
                                                : "text-black bg-bodydark"
                                    }`}
                            >
                                {application.status}
                            </p></div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Applicant Name
                            </label>
                            <div>{application.student_name}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Applicant DOB
                            </label>
                            <div>{new Date(application.student_DOB).toISOString().split('T')[0]}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Applicant CPR
                            </label>
                            <div>{application.student_CPR}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Application Date
                            </label>
                            <div>{new Date(application.createdAt).toISOString().split('T')[0]}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Guardian Name
                            </label>
                            <div>{application.guardian_name}</div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Email
                            </label>
                            <div>{application.email}</div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Grade
                            </label>
                            <div>{application.grade}</div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Gender
                            </label>
                            <div>{application.gender}</div>
                        </div>
                        <div className="mb-4.5">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-600" aria-hidden="true" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">Personal Picture</span>
                                                {/* <span className="flex-shrink-0 text-gray-400">2.4mb</span> */}
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href={application.personal_picture} className="font-medium text-primary">
                                                View
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">Certificate Of Birth</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href={application.certificate_of_birth} className="font-medium text-primary">
                                                View
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">Passport</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href={application.passport} className="font-medium text-primary">
                                                View
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                        {/* <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Personal Picture
                            </label>
                            <img src={application.personal_picture} alt="Personal Picture" className="w-32 h-32" />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Certificate Of Birth
                            </label>
                            <img src={application.certificate_of_birth} alt="Certificate Of Birth" className="w-32 h-32" />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Passport
                            </label>
                            <img src={application.passport} alt="Passport" className="w-32 h-32" />
                        </div> */}

                        {/* Action Buttons */}
                        <div>
                            Quick Actions
                        </div>
                        <div className="flex mt-4">
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
                                <div>
                                    <button
                                        onClick={() => quickAction("Rejected")}
                                        className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// module.exports = viewApplication;

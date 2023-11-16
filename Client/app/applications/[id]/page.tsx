'use client'
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getApplicationById } from '@/services/applicationsService';
import { Application } from '@/types/application';
import { useRouter } from 'next/navigation';

// Functional component for viewing application details
export default function Page({ params }: { params: { id: number } }) {
// const viewApplication = ({ params }: { params: { applicationId: number } }) => {
    const router = useRouter();

    const [application, setApplication] = useState<Application | null>(null);

    useEffect(() => {
        // Fetch application data when the component mounts
        const fetchApplicationData = async () => {
            try {
                const existingApplication = await getApplicationById(params.id);
                setApplication(existingApplication);
            } catch (error) {
                console.error('Error fetching application data:', error);
            }
        };

        fetchApplicationData();
    }, [params.id]);

    const handleEvaluate = async () => {
       
    };

    const handleApprove = async () => {
        
    };

    const handleReject = async () => {
       
    };

    if (!application) {
        return null; // You can render a loading spinner or message here
    }

    return (
        <>
            <Breadcrumb pageName="View Application" />

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">View Application</h3>
                    </div>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Student Name
                            </label>
                            <div>{application.student_name}</div>
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
                        </div>

                        {/* Evaluation Buttons */}
                        <div className="flex mt-4">
                            {/* Evaluate Button */}
                            <div className="mr-4">
                                <button
                                    onClick={handleEvaluate}
                                    className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                                >
                                    Evaluate
                                </button>
                            </div>

                            {/* Approve Button */}
                            <div className="mr-4">
                                <button
                                    onClick={handleApprove}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-opacity-90"
                                >
                                    Approve
                                </button>
                            </div>

                            {/* Reject Button */}
                            <div>
                                <button
                                    onClick={handleReject}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-opacity-90"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// module.exports = viewApplication;
 
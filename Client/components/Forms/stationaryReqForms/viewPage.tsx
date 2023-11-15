// Import necessary modules and components
'use client';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getStationaryRequestById } from '@/services/stationaryRequestService'; // Update with your actual service function
import { StationaryRequest } from '@/types/stationaryRequest';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Functional component for viewing stationary request details
export default function ViewStationaryRequest({ id }: { id: string }) {
    const router = useRouter();

    const [stationaryRequest, setStationaryRequest] = useState<StationaryRequest | null>(null);

    useEffect(() => {
        // Fetch stationary request data when the component mounts
        const fetchStationaryRequestData = async () => {
            try {
                const existingStationaryRequest = await getStationaryRequestById(id);
                setStationaryRequest(existingStationaryRequest);
            } catch (error) {
                console.error('Error fetching stationary request data:', error);
            }
        };

        fetchStationaryRequestData();
    }, [id]);

    if (!stationaryRequest) {
        return null; // You can render a loading spinner or message here
    }

    return (
        <>
            <Breadcrumb pageName="View Stationary Request" />

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">View Stationary Request</h3>
                    </div>
                    <div className="p-6.5">

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Staff ID
                            </label>
                            <div>{stationaryRequest.staff_id}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Status
                            </label>
                            <div>{stationaryRequest.status_name}</div>
                        </div>

                        {/* Back to List and Edit Stationary Request Buttons */}
                        <div className="flex mt-4">
                            {/* Back to List Button */}
                            <div className="mr-4">
                                <Link href="/stationaryRequest" className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                    Back to List
                                </Link>
                            </div>

                            {/* Edit Stationary Request Button */}
                            <div>
                                <Link
                                    href={`/stationaryRequest/edit/${id}`}
                                    className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                                >
                                    Edit Stationary Request
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

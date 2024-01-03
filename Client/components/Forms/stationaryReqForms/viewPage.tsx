// Import necessary modules and components
'use client';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';
import { getStationaryRequestById } from '@/services/stationaryRequestService'; // Update with your actual service function
import { StationaryRequest } from '@/types/stationaryRequest';
import { useRouter } from 'next/navigation';
import { Stationary } from '@/types/stationary';
import { getStationary } from '@/services/stationaryService';
import { getStaffById } from '@/services/staffService'; // Add the actual service function

import Link from 'next/link';

// Functional component for viewing stationary request details
export default function ViewStationaryRequest({ id }: { id: string }) {
    const router = useRouter();

    const [stationaryRequest, setStationaryRequest] = useState<StationaryRequest | null>(null);
    const [stationaries, setStationaries] = useState<Stationary[]>([]);
    const [staffName, setStaffName] = useState<string>('');

    useEffect(() => {
        // Fetch stationary request data when the component mounts
        const fetchStationaryRequestData = async () => {
            try {
                const existingStationaryRequest = await getStationaryRequestById(id);
                setStationaryRequest(existingStationaryRequest);

                // Fetch the list of stationary items
                const stationariesData = await getStationary();
                setStationaries(stationariesData);

                // Fetch staff information based on staff_id
                if (stationaryRequest?.staff_id) {
                    const staffInfo = await getStaffById(Number(stationaryRequest.staff_id));
                    setStaffName(staffInfo ? staffInfo.name : 'Unknown');
                }
            } catch (error) {
                console.error('Error fetching stationary request data:', error);
            }
        };

        fetchStationaryRequestData();
    }, [id]);

    if (!stationaryRequest) {
        return null; // You can render a loading spinner or message here
    }
    const getStationaryName = (stationaryId: number): string => {
        const stationary = stationaries.find(item => item.id === stationaryId);
        return stationary ? stationary.stationary_name : 'Unknown';
    };

    return (
        <>
            <Breadcrumbs previousName='Stationary Requests' currentName='Details' pageTitle="Stationary Request Details" previousPath='/stationaryRequest' />

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">View Stationary Request</h3>
                    </div>
                    <div className="p-6.5">


                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Stationary Name
                            </label>
                            <div>{getStationaryName(stationaryRequest.stationary_id)}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Status
                            </label>
                            <div>{stationaryRequest.status_name}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Requested Quantity
                            </label>
                            <div>{stationaryRequest.requested_quantity}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Staff Name
                            </label>
                            {/* <div>{stationaryRequest.staff_id}</div> */}
                            <div>{staffName}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Notes
                            </label>
                            <div>{stationaryRequest.notes}</div>
                        </div>

                        {/* Back to List and Edit Stationary Request Buttons */}
                        <div className="flex mt-4">
                            {/* Back to List Button */}
                            <div className="mr-4">
                                <Link prefetch={false} href="/stationaryRequest" className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                    Back to List
                                </Link>
                            </div>

                            {/* Edit Stationary Request Button */}
                            <div>
                                <Link prefetch={false}
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

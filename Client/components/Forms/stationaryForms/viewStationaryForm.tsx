// Import necessary modules and components
'use client';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getStationaryById } from '@/services/stationaryService';
import { Stationary } from '@/types/stationary';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Functional component for viewing stationary details
export default function ViewStationary({ stationaryId }: { stationaryId: string }) {
    const router = useRouter();

    const [stationary, setStationary] = useState<Stationary | null>(null);

    useEffect(() => {
        // Fetch stationary data when the component mounts
        const fetchStationaryData = async () => {
            try {
                const existingStationary = await getStationaryById(stationaryId);
                setStationary(existingStationary);
            } catch (error) {
                console.error('Error fetching stationary data:', error);
            }
        };

        fetchStationaryData();
    }, [stationaryId]);

    if (!stationary) {
        return null; // You can render a loading spinner or message here
    }

    return (
        <>
            <Breadcrumb pageName="View Stationary" />

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">View Stationary</h3>
                    </div>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Stationary Name
                            </label>
                            <div>{stationary.stationary_name}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Quantity Available
                            </label>
                            <div>{stationary.quantity_available}</div>
                        </div>
                        {/* Add more fields based on your Stationary type */}


                        {/* Back to List and Edit Stationary Buttons */}
                        <div className="flex mt-4">
                            {/* Back to List Button */}
                            <div className="mr-4">
                                <Link href="/stationary" className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                    Back to List
                                </Link>
                            </div>

                            {/* Edit Stationary Button */}
                            <div>
                                <Link
                                    href={`/stationary/edit/${stationaryId}`}
                                    className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
                                >
                                    Edit Stationary
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

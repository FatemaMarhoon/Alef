// Import necessary modules and components
'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getStationaryRequestById, updateStationaryRequest } from '@/services/stationaryRequestService';
import { useRouter } from 'next/navigation';
import { StationaryRequest } from '@/types/stationaryRequest';
import TemporarySuccessMessage from '@/app/ui/alerts/TempSuccessMsg'; // Import the success message component

export default function EditStationaryRequestForm({ id }: { id: string }) {
    const router = useRouter();

    const [stationaryRequest, setStationaryRequest] = useState<StationaryRequest>({
        id: parseInt(id),
        status_name: '',
        staff_id: '',
        stationary_id: 0,
        requested_quantity: 0,
        notes: '',
        preschool_id: 0,
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate form data
        let hasErrors = false;

        // Add validation logic here

        if (hasErrors) {
            return;
        }

        try {
            // Send the request and log the response
            const response = await updateStationaryRequest(id, stationaryRequest);

            // Set dynamic success message
            setSuccessMessage(`Stationary request updated successfully!`);

            // Show success message
            setShowSuccessMessage(true);

            // Redirect after successful submission
            setTimeout(() => {
                router.push('/stationaryRequest'); // Update the route accordingly
            }, 3000);
        } catch (error) {
            console.error('Error updating stationary request:', error);
        }
    };

    return (
        <>
            <style jsx>{`
                /* Add your custom styles here */
            `}</style>
            <Breadcrumb pageName="Edit Stationary Request" />
            <div className="items-center justify-center min-h-screen">
                {showSuccessMessage && (
                    <TemporarySuccessMessage message={successMessage} onClose={() => setShowSuccessMessage(false)} />
                )}

                <div className="items-center justify-center min-h-screen">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">Edit Stationary Request</h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="p-6.5">
                                    {/* Add form fields for editing stationary request */}
                                    {/* Example:*/}
                                    {/* <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Stationary Name
                                        </label>
                                        <input
                                            type="text"
                                            value={stationaryRequest.stationary_id}
                                            onChange={(e) =>
                                                setStationaryRequest({ ...stationaryRequest, status_name: e.target.value })
                                            }
                                            placeholder="Enter status name"
                                            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.statusName ? 'border-error' : ''
                                                }`}
                                        />
                                        {errors.statusName && (
                                            <p className="text-error text-sm mt-1">{errors.statusName}</p>
                                        )}
                                    </div> */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Status
                                        </label>
                                        <input
                                            type="text"
                                            value={stationaryRequest.status_name}
                                            onChange={(e) =>
                                                setStationaryRequest({ ...stationaryRequest, status_name: e.target.value })
                                            }
                                            placeholder="Enter status name"
                                            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.statusName ? 'border-error' : ''
                                                }`}
                                        />
                                        {errors.statusName && (
                                            <p className="text-error text-sm mt-1">{errors.statusName}</p>
                                        )}
                                    </div>
                                    {/* Continue adding form fields as needed */}
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

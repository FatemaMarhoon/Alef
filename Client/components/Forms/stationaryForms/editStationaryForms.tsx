// Import necessary modules and components
'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getStationaryById, updateStationary } from '@/services/stationaryService';
import { useRouter } from 'next/navigation';
import { Stationary } from '@/types/stationary';
import { UserStorage } from '@/types/user';
import TemporarySuccessMessage from '@/app/ui/alerts/TempSuccessMsg'; // Import the success message component

export default function EditForm({ stationaryId }: { stationaryId: string }) {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();

    const [stationary, setStationary] = useState<Stationary>({
        stationary_name: '',
        quantity_available: 0,
        preschool_id: currentUser?.preschool_id,
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState<{ stationaryName?: string; quantityAvailable?: string }>({});

    useEffect(() => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate form data
        let hasErrors = false;

        // Ensure stationary name is not empty
        if (!stationary.stationary_name.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, stationaryName: 'Stationary name cannot be empty.' }));
            hasErrors = true;
        }

        // Ensure quantity is a non-negative number
        if (stationary.quantity_available < 0 || isNaN(stationary.quantity_available)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                quantityAvailable: 'Quantity must be a non-negative number.',
            }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            // Log the complete stationary data
            console.log('Stationary Data:', stationary);

            // Send the request and log the response
            const response = await updateStationary(stationaryId, stationary);
            console.log('API Response:', response);

            // Set dynamic success message
            setSuccessMessage(`Stationary item "${stationary.stationary_name}" updated successfully!`);

            // Show success message
            setShowSuccessMessage(true);

            // Redirect after successful submission
            setTimeout(() => {
                router.push('/stationary'); // Update the route accordingly
            }, 3000);
        } catch (error) {
            console.error('Error updating stationary item:', error);
        }
    };

    return (
        <>
            <style jsx>{`
                .border-error {
                    border-color: #e53e3e; // Red color for error border
                }
                .text-error {
                    color: #e53e3e; // Red color for error text
                }
            `}</style>
            <Breadcrumb pageName="Edit Stationary Item" />
            <div className="items-center justify-center min-h-screen">
                {showSuccessMessage && (
                    <TemporarySuccessMessage message={successMessage} onClose={() => setShowSuccessMessage(false)} />
                )}

                <div className="items-center justify-center min-h-screen">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">Edit Stationary Item</h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="p-6.5">
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Stationary Name <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={stationary.stationary_name}
                                            onChange={(e) =>
                                                setStationary({ ...stationary, stationary_name: e.target.value })
                                            }
                                            placeholder="Enter stationary name"
                                            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.stationaryName ? 'border-error' : ''
                                                }`}
                                        />
                                        {errors.stationaryName && (
                                            <p className="text-error text-sm mt-1">{errors.stationaryName}</p>
                                        )}
                                    </div>

                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Quantity Available <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={stationary.quantity_available}
                                            onChange={(e) =>
                                                setStationary({
                                                    ...stationary,
                                                    quantity_available: Number(e.target.value),
                                                })
                                            }
                                            placeholder="Enter quantity available"
                                            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.quantityAvailable ? 'border-error' : ''
                                                }`}
                                        />
                                        {errors.quantityAvailable && (
                                            <p className="text-error text-sm mt-1">{errors.quantityAvailable}</p>
                                        )}
                                    </div>

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

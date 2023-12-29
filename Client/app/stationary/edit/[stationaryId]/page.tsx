// Import necessary modules and components
'use client';
import { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';
import { getStationaryById, updateStationary } from '@/services/stationaryService';
import { useRouter } from 'next/navigation';
import { Stationary } from '@/types/stationary';
import { UserStorage } from '@/types/user';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import ErrorAlert from "@/components/ErrorAlert";

export default function EditForm({ params }: { params: { stationaryId: number } }) {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");

    const [stationary, setStationary] = useState<Stationary>({
        stationary_name: '',
        quantity_available: 0,
        preschool_id: currentUser?.preschool_id,
    });
    const [errors, setErrors] = useState<{ stationaryName?: string; quantityAvailable?: string }>({});

    useEffect(() => {
        const fetchStationaryData = async () => {
            try {
                const existingStationary = await getStationaryById(params.stationaryId.toString());
                setStationary(existingStationary);
            } catch (error) {
                console.error('Error fetching stationary data:', error);
            }
        };

        fetchStationaryData();
    }, [params.stationaryId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // // Reset errors
        // setErrors({});

        // // Validate form data
        // let hasErrors = false;

        // // Ensure stationary name is not empty
        // if (!stationary.stationary_name.trim()) {
        //     setErrors((prevErrors) => ({ ...prevErrors, stationaryName: 'Stationary name cannot be empty.' }));
        //     hasErrors = true;
        // }

        // // Ensure quantity is a non-negative number
        // if (stationary.quantity_available < 0 || isNaN(stationary.quantity_available)) {
        //     setErrors((prevErrors) => ({
        //         ...prevErrors,
        //         quantityAvailable: 'Quantity must be a non-negative number.',
        //     }));
        //     hasErrors = true;
        // }

        // if (hasErrors) {
        //     return;
        // }

        try {
            // Log the complete stationary data
            console.log('Stationary Data:', stationary);

            // Send the request and log the response
            const response = await updateStationary(params.stationaryId.toString(), stationary);
            console.log('API Response:', response);

            // Check if response is defined and has data
            if (response && response.data) {
                const successMsg = response.data.message;

                // Check the status after ensuring response and data are defined
                if (response.status === 200 || response.status === 201) {
                    setSuccessMessage(successMsg);
                } else if (response.status == 400 || response.status == 404 || response.status == 500) {
                    setError(response.data.message);
                }


                console.log("Staff member deleted successfully");
                router.push("/stationary");
            } else {
                console.error("Error deleting staff member: Response or data is undefined");
            }
            router.push('/stationary'); // Update the route accordingly

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

            <Breadcrumbs previousName='Stationary' currentName='Edit' pageTitle="Edit Stationary" previousPath='/stationary' />
            <div className="items-center justify-center min-h-screen">
                {error && <ErrorAlert message={error}></ErrorAlert>}


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


'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';
import { createStationary } from '@/services/stationaryService';
import { useRouter } from 'next/navigation';
import { Stationary } from '@/types/stationary';
// import { UserStorage } from '@/types/user';
import { currentPreschool } from '@/services/authService';
import { useSuccessMessageContext } from '../../../components/SuccessMessageContext';
import ErrorAlert from "@/components/ErrorAlert";

export default function CreateForm() {
    const router = useRouter();
    // const currentUser = UserStorage.getCurrentUser();

    const [stationaryName, setStationaryName] = useState('');
    const [quantityAvailable, setQuantityAvailable] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errors, setErrors] = useState<{ stationaryName?: string; quantityAvailable?: string }>({});
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // // Reset errors
        // setErrors({});

        // // Validate form data
        // let hasErrors = false;

        // // Ensure stationary name is not empty
        // if (!stationaryName.trim()) {
        //     setErrors((prevErrors) => ({ ...prevErrors, stationaryName: 'Stationary name cannot be empty.' }));
        //     hasErrors = true;
        // }

        // // Ensure quantity is a non-negative number
        // if (quantityAvailable <= 0 || isNaN(quantityAvailable)) {
        //     setErrors((prevErrors) => ({ ...prevErrors, quantityAvailable: 'Quantity must be a non-negative number.' }));
        //     hasErrors = true;
        // }

        // if (hasErrors) {
        //     return;
        // }

        try {
            var preschool;
            await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
            const stationaryData: Stationary = {
                stationary_name: stationaryName,
                quantity_available: quantityAvailable,
                preschool_id: preschool || 0,
                id: 0
            };

            // Log the complete stationary data
            console.log('Stationary Data:', stationaryData);

            // Send the request and log the response
            const response = await createStationary(stationaryData);
            console.log('API Response:', response);
            const successMsg = response.data.message;
            if (response.status == 200 || response.status == 201) {
                setSuccessMessage(successMsg);
            } else if (response.status == 400 || response.status == 404 || response.status == 500) {
                setError(response.data.message);
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

            <Breadcrumbs previousName='Stationary' currentName='Create' pageTitle="Create Stationary" previousPath='/stationary' />
            <div className="items-center justify-center min-h-screen">
                {error && <ErrorAlert message={error}></ErrorAlert>}

                <div className="items-center justify-center min-h-screen">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">Create Stationary Item</h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="p-6.5">
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Stationary Name <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={stationaryName}
                                            onChange={(e) => setStationaryName(e.target.value)}
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
                                            value={quantityAvailable}
                                            onChange={(e) => setQuantityAvailable(Number(e.target.value))}
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
                                        Create
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

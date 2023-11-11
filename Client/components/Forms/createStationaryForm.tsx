'use client'
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createStationary } from '@/services/stationaryService';
import { useRouter } from 'next/navigation';
import { Stationary } from '@/types/stationary';
import { UserStorage } from "@/types/user";
import TemporarySuccessMessage from '@/app/ui/alerts/TempSuccessMsg'; // Import the success message component

export default function CreateForm() {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();

    const [stationaryName, setStationaryName] = useState("");
    const [quantityAvailable, setQuantityAvailable] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // Dynamic success message

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const stationaryData: Stationary = {

                stationary_name: stationaryName,
                quantity_available: quantityAvailable,
                preschool_id: currentUser?.preschool_id
            };

            // Log the complete stationary data
            console.log('Stationary Data:', stationaryData);

            // Send the request and log the response
            const response = await createStationary(stationaryData);
            console.log('API Response:', response);
            // Set dynamic success message
            setSuccessMessage(`Stationary item "${stationaryName}" created successfully!`);

            // Show success message
            setShowSuccessMessage(true);

            // Redirect after successful submission
            setTimeout(() => {
                router.push('/stationary'); // Update the route accordingly
            }, 3000);
        } catch (error) {
            console.error("Error creating stationary item:", error);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Create Stationary Item" />
            <div className="items-center justify-center min-h-screen">
                {showSuccessMessage && (
                    <TemporarySuccessMessage message={successMessage} onClose={() => setShowSuccessMessage(false)} />
                )}

                <div className=" items-center justify-center min-h-screen">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Create Stationary Item
                                </h3>
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
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
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
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
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
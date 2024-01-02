// Import necessary modules and components
'use client';
import { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';
import { getStationaryById, updateStationary } from '@/services/stationaryService';
import { useRouter } from 'next/navigation';
import { Stationary } from '@/types/stationary';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import NotFound from '@/components/Pages/404';
import NotAuthorized from '@/components/Pages/403';
import { currentPreschool } from "@/services/authService";
import Loader from "@/components/common/Loader"; // Import the Loader component
import ErrorAlert from "@/components/ErrorAlert";

export default function EditForm({ params }: { params: { stationaryId: number } }) {
    const router = useRouter();
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // Added loading state
    const [notFound, setNotFound] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(true);
    const [stationary, setStationary] = useState<Stationary>({
id:0,
        stationary_name: '',
        quantity_available: 0,
        preschool_id: 0,
    });
    const [errors, setErrors] = useState<{ stationaryName?: string; quantityAvailable?: string }>({});

    useEffect(() => {
        const fetchStationaryData = async () => {
            try {
                const existingStationary = await getStationaryById(params.stationaryId.toString());
                setStationary(existingStationary);
                // Authorization check after staff data is fetched
                if (existingStationary && existingStationary.preschool_id !== (await currentPreschool())) {
                    setAuthorized(false);
                } else {
                    setAuthorized(true);
                }

                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching stationary data:', error);
                setLoading(false); // Set loading to false once data is fetched

            }
        };

        fetchStationaryData();
    }, [params.stationaryId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            {loading && <Loader />}
            {!loading && !authorized && <NotAuthorized />}
            {!loading && notFound && <NotFound></NotFound>}
            {!loading && !notFound && authorized && (
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
            )}
        </>
    );
}

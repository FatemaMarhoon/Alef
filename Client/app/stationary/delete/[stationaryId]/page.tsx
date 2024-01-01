// Import necessary modules and components
'use client'
import React, { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb2";
import { getStationaryById, deleteStationary } from "@/services/stationaryService";
import { useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation';
import { Stationary } from "@/types/stationary";
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import NotFound from '@/components/Pages/404';
import NotAuthorized from '@/components/Pages/403';
import { currentPreschool } from "@/services/authService";
import Loader from "@/components/common/Loader"; // Import the Loader component
export default function DeleteStationaryPage({ params }: { params: { stationaryId: number } }) {
    const router = useRouter();
    const [stationary, setStationary] = useState<Stationary | null>(null);
    const { setSuccessMessage } = useSuccessMessageContext();
    const [loading, setLoading] = useState(true); // Added loading state
    const [notFound, setNotFound] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(true);
    useEffect(() => {
        console.log("Stationary ID:", params.stationaryId);

        async function fetchStationary() {
            try {
                if (params.stationaryId) {
                    const stationaryData = await getStationaryById(params.stationaryId.toString());
                    setStationary(stationaryData);
                    // Authorization check after staff data is fetched
                    if (stationaryData && stationaryData.preschool_id !== (await currentPreschool())) {
                        setAuthorized(false);
                    } else {
                        setAuthorized(true);
                    }

                    setLoading(false); // Set loading to false once data is fetched
                }
            } catch (error) {
                console.error("Error fetching stationary:", error);
                setLoading(false); // Set loading to false once data is fetched

            }
        }

        // Check if stationaryId is available before calling fetchStationary
        if (params.stationaryId) {
            fetchStationary();
        }
    }, [params.stationaryId]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");

        if (confirmDelete && params.stationaryId) {
            try {
                // Use await to wait for the asynchronous deleteStaff function
                const response = await deleteStationary(params.stationaryId.toString());

                // Check if response is defined and has data
                if (response && response.data) {
                    const successMsg = response.data.message;

                    // Check the status after ensuring response and data are defined
                    if (response.status === 200 || response.status === 201) {
                        setSuccessMessage(successMsg);
                    }

                    console.log("Staff member deleted successfully");
                    router.push("/stationary");
                } else {
                    console.error("Error deleting stationary : Response or data is undefined");
                }
            } catch (error) {
                console.error("Error deleting stationary:", error);
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
                    <Breadcrumbs previousName='Stationary' currentName='Delete' pageTitle="Delete Stationary" previousPath='/stationary' />

                    <div className="items-center justify-center min-h-screen">
                        <div className="flex flex-col gap-9">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">Delete Stationary Item</h3>
                                </div>
                                <div className="p-6.5">
                                    {stationary ? (
                                        <>
                                            <p>
                                                <strong>Stationary Name:</strong> {stationary.stationary_name}
                                            </p>
                                            <p>
                                                <strong>Quantity Available:</strong> {stationary.quantity_available}
                                            </p>
                                            {/* Display other stationary information using <p> or <h> tags */}
                                        </>
                                    ) : (
                                        <p>Loading stationary information...</p>
                                    )}

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="flex justify-center items-center rounded bg-danger p-3 font-medium text-white"
                                        >
                                            Delete Stationary Item
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

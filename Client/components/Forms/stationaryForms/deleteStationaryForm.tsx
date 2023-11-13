// Import necessary modules and components
'use client'
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getStationaryById, deleteStationary } from "@/services/stationaryService";
import { useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation';
import { Stationary } from "@/types/stationary";

export default function DeleteStationaryPage({ stationaryId }: { stationaryId: string }) {
    const router = useRouter();
    const [stationary, setStationary] = useState<Stationary | null>(null);

    useEffect(() => {
        console.log("Stationary ID:", stationaryId);

        async function fetchStationary() {
            try {
                if (stationaryId) {
                    const stationaryData = await getStationaryById(stationaryId);
                    setStationary(stationaryData);
                }
            } catch (error) {
                console.error("Error fetching stationary:", error);
            }
        }

        // Check if stationaryId is available before calling fetchStationary
        if (stationaryId) {
            fetchStationary();
        }
    }, [stationaryId]);

    const handleDelete = () => {
        console.log("Before confirmation");
        const confirmDelete = window.confirm("Are you sure you want to delete this stationary item?");
        console.log("After confirmation", confirmDelete);

        if (confirmDelete && stationaryId) {
            deleteStationary(stationaryId)
                .then(() => {
                    console.log("Stationary item deleted successfully");
                    router.push("/stationary");
                })
                .catch((error) => {
                    console.error("Error deleting stationary item:", error);
                });
        }
    };

    return (
        <>
            <Breadcrumb pageName="Delete Stationary Item" />

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
    );
}

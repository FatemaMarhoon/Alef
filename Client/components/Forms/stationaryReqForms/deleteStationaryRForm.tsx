// Import necessary modules and components
'use client'
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getStationaryRequestById, deleteStationaryRequest } from "@/services/stationaryRequestService"; // Update with your actual service functions
import { useRouter } from 'next/navigation';
import { StationaryRequest } from "@/types/stationaryRequest";
import { getStationary } from '@/services/stationaryService';
import { getStaffById } from '@/services/staffService'; // Add the actual service function
import { Stationary } from '@/types/stationary';

export default function DeleteStationaryRequestPage({ id }: { id: string }) {
    const router = useRouter();
    const [stationaryRequest, setStationaryRequest] = useState<StationaryRequest | null>(null);
    const [stationaries, setStationaries] = useState<Stationary[]>([]);
    const [staffName, setStaffName] = useState<string>('');

    useEffect(() => {
        async function fetchStationaryRequest() {
            try {
                if (id) {
                    const stationaryRequestData = await getStationaryRequestById(id);
                    setStationaryRequest(stationaryRequestData);

                    // Fetch the list of stationary items
                    const stationariesData = await getStationary();
                    setStationaries(stationariesData);

                    // Fetch staff information based on staff_id
                    const staffInfo = await getStaffById(parseInt(stationaryRequestData.staff_id));
                    setStaffName(staffInfo ? staffInfo.name : 'Unknown');
                }
            } catch (error) {
                console.error("Error fetching stationary request:", error);
            }
        }

        // Check if requestId is available before calling fetchStationaryRequest
        if (id) {
            fetchStationaryRequest();
        }
    }, [id]);

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this stationary request?");

        if (confirmDelete && id) {
            deleteStationaryRequest(id)
                .then(() => {
                    console.log("Stationary request deleted successfully");
                    router.push("/stationaryRequest"); // Redirect to the stationary requests list page
                })
                .catch((error) => {
                    console.error("Error deleting stationary request:", error);
                });
        }
    };
    const getStationaryName = (stationaryId: number): string => {
        const stationary = stationaries.find(item => item.id === stationaryId);
        return stationary ? stationary.stationary_name : 'Unknown';
    };
    return (
        <>
            <Breadcrumb pageName="Delete Stationary Request" />

            <div className="items-center justify-center min-h-screen">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Delete Stationary Request</h3>
                        </div>
                        <div className="p-6.5">
                            {stationaryRequest ? (
                                <>
                                    <p>
                                        <strong>Stationary Name:</strong> {getStationaryName(stationaryRequest.stationary_id)}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {stationaryRequest.status_name}
                                    </p>
                                    <p>
                                        <strong>Requested Quantity:</strong> {stationaryRequest.requested_quantity}
                                    </p>
                                    <p>
                                        <strong>Staff Name:</strong> {staffName}
                                    </p>
                                    <p>
                                        <strong>Notes:</strong> {stationaryRequest.notes}
                                    </p>
                                </>
                            ) : (
                                <p>Loading stationary request information...</p>
                            )}

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex justify-center items-center rounded bg-danger p-3 font-medium text-white"
                                >
                                    Delete Stationary Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

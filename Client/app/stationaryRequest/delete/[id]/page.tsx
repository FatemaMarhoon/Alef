// Import necessary modules and components
'use client'
import React, { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb2";
import { getStationaryRequestById, deleteStationaryRequest } from "@/services/stationaryRequestService"; // Update with your actual service functions
import { useRouter } from 'next/navigation';
import { StationaryRequest } from "@/types/stationaryRequest";
import { getStationary } from '@/services/stationaryService';
import { getStaffById } from '@/services/staffService'; // Add the actual service function
import { Stationary } from '@/types/stationary';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';

export default function DeleteStationaryRequestPage({ params }: { params: { id: number } }) {
    const router = useRouter();
    const [stationaryRequest, setStationaryRequest] = useState<StationaryRequest | null>(null);
    const [stationaries, setStationaries] = useState<Stationary[]>([]);
    const [staffName, setStaffName] = useState<string>('');
    const { setSuccessMessage } = useSuccessMessageContext();

    useEffect(() => {
        async function fetchStationaryRequest() {
            try {
                if (params.id) {
                    const stationaryRequestData = await getStationaryRequestById(params.id.toString());
                    setStationaryRequest(stationaryRequestData);

                    // Fetch the list of stationary items
                    const stationariesData = await getStationary();
                    setStationaries(stationariesData);

                    // Fetch staff information based on staff_id
                    const staffInfo = await getStaffById(parseInt(String(stationaryRequestData.staff_id)));
                    setStaffName(staffInfo ? staffInfo.name : 'Unknown');
                }
            } catch (error) {
                console.error("Error fetching stationary request:", error);
            }
        }

        // Check if requestId is available before calling fetchStationaryRequest
        if (params.id) {
            fetchStationaryRequest();
        }
    }, [params.id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");

        if (confirmDelete && params.id) {
            try {
                // Use await to wait for the asynchronous deleteStaff function
                const response = await deleteStationaryRequest(params.id.toString());

                // Check if response is defined and has data
                if (response && response.data) {
                    const successMsg = response.data.message;

                    // Check the status after ensuring response and data are defined
                    if (response.status === 200 || response.status === 201) {
                        setSuccessMessage(successMsg);
                    }



                }
                router.push("/stationaryRequest");
            } catch (error) {
                console.error("Error deleting stationaryReq:", error);
            }
        }
    };
    const getStationaryName = (stationaryId: number): string => {
        const stationary = stationaries.find(item => item.id === stationaryId);
        return stationary ? stationary.stationary_name : 'Unknown';
    };
    return (
        <>
            <Breadcrumbs previousName='Stationary Requests' currentName='Delete' pageTitle="Delete Stationary Request" previousPath='/stationaryRequest' />

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

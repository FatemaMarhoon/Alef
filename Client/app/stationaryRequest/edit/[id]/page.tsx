// Import necessary modules and components
'use client';
import { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';
import { getStationaryRequestById, updateStationaryRequest } from '@/services/stationaryRequestService';
import { useRouter } from 'next/navigation';
import { StationaryRequest } from '@/types/stationaryRequest';
import TemporarySuccessMessage from '@/app/ui/alerts/TempSuccessMsg'; // Import the success message component
import { getStationary } from '@/services/stationaryService';
import { getStaffById } from '@/services/staffService'; // Add the actual service function
import { Stationary } from '@/types/stationary';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import ErrorAlert from "@/components/ErrorAlert";
import { StaticValue } from "@/types/staticValue";
import { getRequestStatuses } from "@/services/staticValuesService";
import Loader from "@/components/common/Loader"; // Import the Loader component
import NotFound from '@/components/Pages/404';
import NotAuthorized from '@/components/Pages/403';
import { currentPreschool } from "@/services/authService";
export default function EditStationaryRequestForm({ params }: { params: { id: number } }) {
    const router = useRouter();
    const { setSuccessMessage } = useSuccessMessageContext();

    const [stationaryRequest, setStationaryRequest] = useState<StationaryRequest>({
        id: params.id,
        status_name: '',
        staff_id: 0,
        stationary_id: 0,
        requested_quantity: 0,
        notes: '',
        preschool_id: 0,
        class_id: 0
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [stationaries, setStationaries] = useState<Stationary[]>([]);
    const [staffName, setStaffName] = useState<string>('');
    const [stationaryList, setStationaryList] = useState<Stationary[]>([]);
    const [error, setError] = useState("");
    const [requestStatuses, setRequestStatuses] = useState<StaticValue[]>([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [notFound, setNotFound] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(true);
    useEffect(() => {
        // Fetch gender types when the component mounts
        async function fetchRequestStatuses() {
            try {
                const types = await getRequestStatuses();
                setRequestStatuses(types);
                setLoading(false); // Set loading to false once data is fetched

                console.log(types);
            } catch (error) {
                console.error("Error fetching :", error);
                setLoading(false); // Set loading to false once data is fetched

            }
        }
        fetchRequestStatuses();
    }, []);


    useEffect(() => {
        const fetchStationaryRequestData = async () => {
            try {
                const existingStationaryRequest = await getStationaryRequestById(params.id.toString());
                setStationaryRequest(existingStationaryRequest);
                // Authorization check after staff data is fetched
                if (existingStationaryRequest && existingStationaryRequest.preschool_id !== (await currentPreschool())) {
                    setAuthorized(false);
                } else {
                    setAuthorized(true);
                }

                // Fetch the list of stationary items
                const stationariesData = await getStationary();
                setStationaries(stationariesData);

                // Fetch staff information based on staff_id
                const staffInfo = await getStaffById((existingStationaryRequest.staff_id));
                setStaffName(staffInfo ? staffInfo.name : 'Unknown');
                setLoading(false); // Set loading to false once data is fetched

            } catch (error) {
                console.error('Error fetching stationary request data:', error);
                setLoading(false); // Set loading to false once data is fetched

            }
        };

        fetchStationaryRequestData();
    }, [params.id]);

    useEffect(() => {
        async function fetchStationaryList() {
            try {
                const response = await getStationary();
                console.log('Stationary List Response:', response);

                // Log the response.data or the actual array
                //  console.log('Stationary List Data:', response.data || response);

                setStationaryList(response || []);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error("Error fetching stationary list:", error);
                setStationaryList([]);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchStationaryList();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log("before response");

            // Find the Stationary item in stationaryList corresponding to stationaryRequest.stationary_id
            const selectedStationary = stationaryList.find(item => item.id === stationaryRequest.stationary_id);

            if (!selectedStationary) {
                console.error('Corresponding Stationary not found.');
                return;
            }

            // Simplified condition
            if (stationaryRequest.requested_quantity > selectedStationary.quantity_available) {
                console.log('Alert triggered: Requested quantity is greater than the available quantity!');

                // Display a confirmation dialog
                const confirmation = window.confirm('Requested quantity is greater than the available quantity. Do you want to proceed?');

                // If the user clicks "Cancel," stop further processing
                if (!confirmation) {
                    console.log('User canceled the operation.');
                    return;
                }
            }

            // Send the request and log the response
            const response = await updateStationaryRequest(params.id.toString(), stationaryRequest);

            // Check if response is defined and has data
            if (response && response.data) {
                const successMsg = response.data.message;

                // Check the status after ensuring response and data are defined
                if (response.status === 200 || response.status === 201) {
                    setSuccessMessage(successMsg);
                } else if (response.status == 400 || response.status == 404 || response.status == 500) {
                    setError(response.data.message);
                }
            }

            router.push('/stationaryRequest'); // Update the route accordingly
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            }
        }
    };



    // Function to get the existing quantity of the selected stationary
    const getStationaryQuantity = (stationaryId: number): number => {
        const stationary = stationaries.find(item => item.id === stationaryId);
        return stationary ? stationary.quantity_available : 0;
    };
    return (
        <>
            {loading && <Loader />}
            {!loading && !authorized && <NotAuthorized />}
            {!loading && notFound && <NotFound></NotFound>}
            {!loading && !notFound && authorized && (
                <> <Breadcrumbs previousName='Stationary Requests' currentName='Edit' pageTitle="Edit Stationary Request" previousPath='/stationaryRequest' />
                    {error && <ErrorAlert message={error}></ErrorAlert>}

                    <div className="items-center justify-center min-h-screen">
                        <div className="flex flex-col gap-9">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">Edit Stationary Request</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="p-6.5">
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Stationary Name <span className="text-meta-1">*</span>
                                            </label>
                                            <select
                                                disabled
                                                value={stationaryRequest.stationary_id}
                                                onChange={(e) => setStationaryRequest({ ...stationaryRequest, stationary_id: Number(e.target.value) })}
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.statusName ? 'border-error' : ''}`}
                                            >
                                                <option value={0}>Select Stationary</option>
                                                {stationaryList.length > 0 &&
                                                    stationaryList.map((stationary) => (
                                                        <option key={stationary.id} value={stationary.id}>
                                                            {stationary.stationary_name}
                                                        </option>
                                                    ))}
                                            </select>
                                            {errors.statusName && (
                                                <p className="text-error text-sm mt-1">{errors.statusName}</p>
                                            )}
                                        </div>


                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Status
                                            </label>
                                            <select
                                                value={stationaryRequest.status_name}
                                                onChange={(e) => setStationaryRequest({ ...stationaryRequest, status_name: e.target.value })}
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.statusName ? 'border-error' : ''}`}
                                            >
                                                {requestStatuses.map((status, index) => (
                                                    <option key={index} value={status.ValueName}>
                                                        {status.ValueName}
                                                    </option>
                                                ))}
                                                {/* Add other status options as needed */}
                                            </select>
                                            {errors.statusName && (
                                                <p className="text-error text-sm mt-1">{errors.statusName}</p>
                                            )}
                                        </div>

                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Requested Quantity <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                readOnly
                                                type="number"
                                                value={stationaryRequest.requested_quantity}
                                                onChange={(e) => setStationaryRequest({ ...stationaryRequest, requested_quantity: (Number(e.target.value)) })}
                                                placeholder="Enter requested quantity"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary" />
                                            {errors.requestedQuantity && (
                                                <p className="text-error text-sm mt-1">{errors.requestedQuantity}</p>
                                            )}
                                        </div>

                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Staff Name
                                            </label>
                                            <input

                                                type="text"
                                                value={staffName}
                                                readOnly
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`} />
                                        </div>
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Notes
                                            </label>
                                            <textarea
                                                readOnly
                                                value={stationaryRequest.notes}
                                                onChange={(e) => setStationaryRequest({ ...stationaryRequest, notes: e.target.value })}
                                                placeholder="Enter notes"
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`} />
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
                </>
            )}
        </>
    );
}

// Import necessary modules and components
'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getStationaryRequestById, updateStationaryRequest } from '@/services/stationaryRequestService';
import { useRouter } from 'next/navigation';
import { StationaryRequest } from '@/types/stationaryRequest';
import TemporarySuccessMessage from '@/app/ui/alerts/TempSuccessMsg'; // Import the success message component
import { getStationary } from '@/services/stationaryService';
import { getStaffById } from '@/services/staffService'; // Add the actual service function
import { Stationary } from '@/types/stationary';
import { StaticValue } from "@/types/staticValue";
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import ErrorAlert from "@/components/ErrorAlert";

export default function EditStationaryRequestForm({ params }: { params: { id: number } }) {
    const router = useRouter();
    const { setSuccessMessage } = useSuccessMessageContext();

    const [stationaryRequest, setStationaryRequest] = useState<StationaryRequest>({
        id: params.id,
        status_name: '',
        staff_id: '',
        stationary_id: 0,
        requested_quantity: 0,
        notes: '',
        preschool_id: 0,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [stationaries, setStationaries] = useState<Stationary[]>([]);
    const [staffName, setStaffName] = useState<string>('');
    const [stationaryList, setStationaryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStationaryRequestData = async () => {
            try {
                const existingStationaryRequest = await getStationaryRequestById(params.id.toString());
                setStationaryRequest(existingStationaryRequest);

                // Fetch the list of stationary items
                const stationariesData = await getStationary();
                setStationaries(stationariesData);

                // Fetch staff information based on staff_id
                const staffInfo = await getStaffById(parseInt(existingStationaryRequest.staff_id));
                setStaffName(staffInfo ? staffInfo.name : 'Unknown');
            } catch (error) {
                console.error('Error fetching stationary request data:', error);
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
                console.log('Stationary List Data:', response.data || response);

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

        // // Reset errors
        // setErrors({});

        // // Validate form data
        // let hasErrors = false;

        // // Validation logic
        // if (stationaryRequest.status_name === 'Accepted' && stationaryRequest.requested_quantity > getStationaryQuantity(stationaryRequest.stationary_id)) {
        //     setErrors({ requestedQuantity: 'Requested quantity is greater than the existing quantity.' });
        //     hasErrors = true;
        // }

        // // Add validation logic here

        // if (hasErrors) {
        //     return;
        // }

        try {
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
            }
            else if (error.message) {
                setError(error.message);
            }
        }
    };
    const getStationaryName = (stationaryId: number): string => {
        const stationary = stationaries.find(item => item.id === stationaryId);
        return stationary ? stationary.stationary_name : 'Unknown';


    };

    // Function to get the existing quantity of the selected stationary
    const getStationaryQuantity = (stationaryId: number): number => {
        const stationary = stationaries.find(item => item.id === stationaryId);
        return stationary ? stationary.quantity_available : 0;
    };
    return (
        <>


            <Breadcrumb pageName="Edit Stationary Request" />
            {error && <ErrorAlert message={error}></ErrorAlert>}

            <div className="items-center justify-center min-h-screen">


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
                                            value={stationaryRequest.stationary_id}
                                            onChange={(e) => setStationaryRequest({ ...stationaryRequest, stationary_id: Number(e.target.value) })}
                                            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.statusName ? 'border-error' : ''
                                                }`}
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
                                            onChange={(e) =>
                                                setStationaryRequest({ ...stationaryRequest, status_name: e.target.value })
                                            }
                                            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.statusName ? 'border-error' : ''
                                                }`}
                                        >
                                            <option value="">Select status....</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
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
                                            type="number"
                                            value={stationaryRequest.requested_quantity}
                                            onChange={(e) => setStationaryRequest({ ...stationaryRequest, requested_quantity: (Number(e.target.value)) })}
                                            placeholder="Enter requested quantity"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                                        />
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
                                            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                                        />
                                    </div>
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Notes
                                        </label>
                                        <textarea
                                            value={stationaryRequest.notes}
                                            onChange={(e) =>
                                                setStationaryRequest({ ...stationaryRequest, notes: e.target.value })
                                            }
                                            placeholder="Enter notes"
                                            className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                                        />
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
            </div>
        </>
    );
}

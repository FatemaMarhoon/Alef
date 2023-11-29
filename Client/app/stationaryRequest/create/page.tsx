'use client'
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createStationaryRequest } from '@/services/stationaryRequestService'; // Assuming you have this service
import { useRouter } from 'next/navigation';
import { StationaryRequest } from '@/types/stationaryRequest';
import { UserStorage } from "@/types/user";
import { getStationary } from '@/services/stationaryService'; // Assuming you have this service
import { Stationary } from '@/types/stationary';
import { useSuccessMessageContext } from '../../../components/SuccessMessageContext';
import { currentPreschool } from '@/services/authService';
import ErrorAlert from "@/components/ErrorAlert";

export default function CreateForm() {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();
    const [statusName, setStatusName] = useState("");
    const [staffId, setStaffId] = useState(currentUser?.id || ""); // Set default value to current user's id
    const [stationaryId, setStationaryId] = useState(""); // Set an appropriate default value
    const [requestedQuantity, setRequestedQuantity] = useState(0);
    const [notes, setNotes] = useState("");
    const [stationaryList, setStationaryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");

    // useEffect(() => {
    //     const fetchStationaryList = async () => {
    //         try {
    //             const response = await getStationary();
    //             console.log('Stationary List Response:', response);

    //             // Log the response.data or the actual array
    //             console.log('Stationary List Data:', response.data || response);

    //             setStationaryList(response.data || []);
    //             setLoading(false); // Set loading to false after fetching data
    //         } catch (error) {
    //             console.error("Error fetching stationary list:", error);
    //             setStationaryList([]);
    //             setLoading(false); // Set loading to false in case of an error
    //         }
    //     };

    //     fetchStationaryList();
    // }, []);
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

    // Check if loading
    if (loading) {
        return <p>Loading...</p>; // You can replace this with a loading indicator or any other content
    }

    // Log the stationary list just before returning
    console.log('Render - Stationary List:', stationaryList);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //get the preschool id
            var preschool;
            await currentPreschool().then((preschoolId) => { preschool = preschoolId; })

            const stationaryRequestData: StationaryRequest = {
                status_name: "Pending",
                //fix the logic of the staff id
                staff_id: staffId,
                stationary_id: stationaryId,
                requested_quantity: requestedQuantity,
                notes: notes,
                preschool_id: preschool
            };

            // Log the complete stationary request data
            console.log('Stationary Request Data:', stationaryRequestData);

            // Send the request and log the response
            const response = await createStationaryRequest(stationaryRequestData);
            console.log('API Response:', response);
            const successMsg = response.data.message;
            if (response.status == 200 || response.status == 201) {
                setSuccessMessage(successMsg);
            } else if (response.status == 400 || response.status == 404 || response.status == 500) {
                setError(response.data.message);
            }
            // Redirect after successful submission
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


    return (
        <>
            <Breadcrumb pageName="Create Stationary Request" />
            {error && <ErrorAlert message={error}></ErrorAlert>}

            <div className="items-center justify-center min-h-screen">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Create Stationary Request
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                {/* <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Status Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={statusName}
                                        onChange={(e) => setStatusName(e.target.value)}
                                        placeholder="Enter status name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div> */}

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Staff ID <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={currentUser.id}
                                        onChange={(e) => setStaffId(e.target.value)}
                                        placeholder="Enter staff ID"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Stationary Name <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        value={stationaryId}
                                        onChange={(e) => setStationaryId(Number(e.target.value))}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    >
                                        <option value={0}>Select Stationary</option>
                                        {stationaryList.length > 0 &&
                                            stationaryList.map((stationary) => (
                                                <option key={stationary.id} value={stationary.id}>
                                                    {stationary.stationary_name}
                                                </option>
                                            ))}
                                    </select>

                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Requested Quantity <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={requestedQuantity}
                                        onChange={(e) => setRequestedQuantity(Number(e.target.value))}
                                        placeholder="Enter requested quantity"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Notes
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Enter notes"
                                        rows={4}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    ></textarea>
                                </div>

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

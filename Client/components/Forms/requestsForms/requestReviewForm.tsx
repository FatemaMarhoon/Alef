import React, { useState, useEffect } from 'react';
import { getRequestById, updateRequestStatus } from '@/services/requestService';
import { Request } from '@/types/request';
import { useRouter } from 'next/navigation';
import { createPreschool } from '@/services/preschoolService'; // Import the preschool service
import { createUser } from '@/services/userService'; // Import the preschool service

interface RequestReviewPageProps {
    requestId: string;
}

const RequestReviewPage: React.FC<RequestReviewPageProps> = ({ requestId }) => {
    const [request, setRequest] = useState<Request | null>(null);
    const [newStatus, setNewStatus] = useState<string>('');
    const router = useRouter();
    const parsedRequestId = parseInt(requestId);

    useEffect(() => {
        async function fetchRequest() {
            try {
                const requestData = await getRequestById(requestId);
                setRequest(requestData);
                // setNewStatus(requestData.status); // Set the initial selected value here

            } catch (error) {
                console.error('Error fetching request:', error);
            }
        }

        fetchRequest();
    }, [requestId]);

    const handleStatusChange = async () => {
        try {
            console.log('Updating status...');
            console.log('Request ID:', requestId);
            console.log('New Status:', newStatus);

            // Perform the status update API call
            await updateRequestStatus(requestId, newStatus);

            console.log('Status updated successfully.');

            // Redirect after successful submission
            router.push('/requests');

            // Optionally, you can refresh the request data after the status update
            const updatedRequestData = await getRequestById(requestId);

            // Update the local state after the API call is complete
            setRequest(updatedRequestData);

            // If the new status is "Accepted", create a new preschool
            if (newStatus === 'Accepted') {
                console.log('Creating new preschool with the following data:');
                console.log('Preschool Name:', updatedRequestData?.preschool_name);
                console.log('Request ID:', parseInt(requestId));
                console.log('Plan ID:', updatedRequestData?.plan_id);

                // Create the preschool
                await createPreschool(
                    // Pass relevant information from the request object
                    updatedRequestData?.preschool_name,
                    parsedRequestId,
                    updatedRequestData?.plan_id,
                    // Add other properties as needed
                ).then(async (createdPreschool) => {
                    console.log('Preschool created successfully.');

                    // Fetch the data for the newly created preschool
                    console.log("created preschool id", createdPreschool.preschool.id // Use the preschool ID here
                    );
                    const preschoolId = createdPreschool.preschool.id;
                    console.log("created preschool id", preschoolId// Use the preschool ID here
                    );
                    // Create the user with information about the preschool
                    await createUser(
                        updatedRequestData?.email,
                        updatedRequestData?.representitive_name,
                        'Admin',
                        preschoolId// Use the preschool ID here
                    );

                    console.log('User created successfully.');
                });
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };



    if (!request) {
        // You can add loading or error handling here
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Review Request</h3>
                    </div>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">Request ID:</label>
                            <input
                                type="text"
                                value={request.id}
                                disabled
                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">Preschool Name:</label>
                            <input
                                type="text"
                                value={request.preschool_name}
                                disabled
                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">Representative Name:</label>
                            <input
                                type="text"
                                value={request.representitive_name}
                                disabled
                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">CR:</label>
                            <input
                                type="text"
                                value={request.CR}
                                disabled
                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">Phone:</label>
                            <input
                                type="text"
                                value={request.phone}
                                disabled
                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">Email:</label>
                            <input
                                type="text"
                                value={request.email}
                                disabled
                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                            />
                        </div>
                        {/* Repeat similar structure for other request details */}
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">Status:</label>
                            <select
                                value={request.status}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                            >
                                <option value="">Select status....</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                                {/* Add other status options as needed */}
                            </select>
                        </div>
                        <button
                            onClick={handleStatusChange}
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
                        >
                            Update Status
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestReviewPage;
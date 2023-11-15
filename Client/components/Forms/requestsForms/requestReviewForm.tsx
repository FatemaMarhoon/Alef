// // RequestReviewPage.tsx

// import React, { useState, useEffect } from 'react';
// import { getRequestById, updateRequestStatus } from '@/services/requestService'; // Import the request service
// import { Request } from '@/types/request';
// import { useRouter } from 'next/navigation';

// interface RequestReviewPageProps {
//     requestId: string;
// }

// const RequestReviewPage: React.FC<RequestReviewPageProps> = ({ requestId }) => {
//     const [request, setRequest] = useState<Request | null>(null);
//     const [newStatus, setNewStatus] = useState<string>('');
//     const router = useRouter();

//     useEffect(() => {
//         async function fetchRequest() {
//             try {
//                 const requestData = await getRequestById(requestId);
//                 setRequest(requestData);
//             } catch (error) {
//                 console.error('Error fetching request:', error);
//             }
//         }

//         fetchRequest();
//     }, [requestId]);

//     const handleStatusChange = async () => {
//         try {
//             console.log('Updating status...');
//             console.log('Request ID:', requestId);
//             console.log('New Status:', newStatus);

//             // Perform the status update API call
//             await updateRequestStatus(requestId, newStatus);

//             console.log('Status updated successfully.');
//             // Redirect after successful submission
//             router.push('/requests');
//             // Optionally, you can refresh the request data after the status update
//             const updatedRequestData = await getRequestById(requestId);
//             setRequest(updatedRequestData);
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };


//     if (!request) {
//         // You can add loading or error handling here
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <div className="border-b border-stroke py-4 px-6.5">
//                 <h3 className="font-medium text-black dark:text-white">
//                     Review Request
//                 </h3>
//             </div>
//             <div className="p-6.5 space-y-4">
//                 <p>Request ID: {request.id}</p>
//                 <p>Preschool Name: {request.preschool_name}</p>
//                 <p>Representative Name: {request.representitive_name}</p>
//                 <p>CR: {request.CR}</p>
//                 <p>Phone: {request.phone}</p>
//                 <p>Email: {request.email}</p>
//                 {/* Include other request details as needed */}
//                 <div className="flex items-center">
//                     <p className="mr-4">Status:</p>
//                     <select
//                         value={newStatus}
//                         onChange={(e) => setNewStatus(e.target.value)}
//                     >
//                         <option value="Pending">Pending</option>
//                         <option value="Accepted">Accepted</option>
//                         <option value="Rejected">Rejected</option>
//                         {/* Add other status options as needed */}
//                     </select>
//                 </div>
//                 <button onClick={handleStatusChange} className="bg-primary text-white px-4 py-2 rounded-md">
//                     Update Status
//                 </button>
//             </div>

//         </div>
//     );
// };

// export default RequestReviewPage;
import React, { useState, useEffect } from 'react';
import { getRequestById, updateRequestStatus } from '@/services/requestService';
import { Request } from '@/types/request';
import { useRouter } from 'next/navigation';

interface RequestReviewPageProps {
    requestId: string;
}

const RequestReviewPage: React.FC<RequestReviewPageProps> = ({ requestId }) => {
    const [request, setRequest] = useState<Request | null>(null);
    const [newStatus, setNewStatus] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        async function fetchRequest() {
            try {
                const requestData = await getRequestById(requestId);
                setRequest(requestData);
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
            setRequest(updatedRequestData);
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
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                            >
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
'use client'
import React, { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb2";
import { getStaffById, deleteStaff } from "@/services/staffService"; // Assuming you have a staff service
import { useRouter } from 'next/navigation';
import { Staff } from "@/types/staff";
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import NotFound from '@/components/Pages/404';
import NotAuthorized from '@/components/Pages/403';
import { currentPreschool } from "@/services/authService";
import Loader from "@/components/common/Loader"; // Import the Loader component

export default function DeleteStaffPage({ params }: { params: { staffId: number } }) {
    const router = useRouter();
    const [staff, setStaff] = useState<Staff | null>(null);
    const { setSuccessMessage } = useSuccessMessageContext();
    const [loading, setLoading] = useState(true); // Added loading state
    const [notFound, setNotFound] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(true);
    useEffect(() => {
        async function fetchStaff() {
            try {
                if (params.staffId) {
                    const staffData = await getStaffById(params.staffId);
                    setStaff(staffData);
                    // Authorization check after staff data is fetched
                    if (staffData && staffData.preschool_id !== (await currentPreschool())) {
                        setAuthorized(false);
                    } else {
                        setAuthorized(true);
                    }

                    setLoading(false); // Set loading to false once data is fetched
                }
            } catch (error) {
                console.error("Error fetching staff:", error);
                setLoading(false); // Set loading to false once data is fetched

            }
        }

        // Check if staffId is available before calling fetchStaff
        if (params.staffId) {
            fetchStaff();
        }
    }, [params.staffId]);
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");

        if (confirmDelete && params.staffId) {
            try {
                // Use await to wait for the asynchronous deleteStaff function
                const response = await deleteStaff(params.staffId);

                // Check if response is defined and has data
                if (response && response.data) {
                    const successMsg = response.data.message;

                    // Check the status after ensuring response and data are defined
                    if (response.status === 200 || response.status === 201) {
                        setSuccessMessage(successMsg);
                    }

                    console.log("Staff member deleted successfully");
                    router.push("/staff");
                } else {
                    console.error("Error deleting staff member: Response or data is undefined");
                }
            } catch (error) {
                console.error("Error deleting staff member:", error);
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
                    <Breadcrumbs previousName='Staff' currentName='Delete' pageTitle="Delete Staff" previousPath='/staff' />

                    <div className="items-center justify-center min-h-screen">
                        <div className="flex flex-col gap-9">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">Delete Staff</h3>
                                </div>
                                <div className="p-6.5">
                                    {staff ? (
                                        <>
                                            <p>
                                                <strong>Name:</strong> {staff.name}
                                            </p>
                                            <p>
                                                <strong>CPR:</strong> {staff.CPR}
                                            </p>
                                            <p>
                                                <strong>Phone:</strong> {staff.phone}
                                            </p>
                                            <p>
                                                <strong>Hire Date:</strong> {new Date(staff.hire_date).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {staff.email}
                                            </p>
                                            {/* Display other staff information using <p> or <h> tags */}
                                        </>
                                    ) : (
                                        <p>Loading staff information...</p>
                                    )}

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="flex justify-center items-center rounded bg-danger p-3 font-medium text-white"
                                        >
                                            Delete Staff
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>);
}

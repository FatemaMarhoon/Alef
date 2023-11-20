import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getStaffById, deleteStaff } from "@/services/staffService"; // Assuming you have a staff service
import { useRouter } from 'next/navigation';
import { Staff } from "@/types/staff";

export default function DeleteStaffPage({ staffId }: { staffId: string }) {
    const router = useRouter();
    const [staff, setStaff] = useState<Staff | null>(null);

    useEffect(() => {
        async function fetchStaff() {
            try {
                if (staffId) {
                    const staffData = await getStaffById(parseInt(staffId));
                    setStaff(staffData);
                }
            } catch (error) {
                console.error("Error fetching staff:", error);
            }
        }

        // Check if staffId is available before calling fetchStaff
        if (staffId) {
            fetchStaff();
        }
    }, [staffId]);

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");

        if (confirmDelete && staffId) {
            deleteStaff(parseInt(staffId))
                .then(() => {
                    console.log("Staff member deleted successfully");
                    router.push("/staff");
                })
                .catch((error) => {
                    console.error("Error deleting staff member:", error);
                });
        }
    };

    return (
        <>
            <Breadcrumb pageName="Delete Staff" />

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
    );
}

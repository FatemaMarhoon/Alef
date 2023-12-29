// Import necessary modules and components
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb2";
import { getStaffById } from '@/services/staffService'; // Assuming you have a staff service
import { Staff } from '@/types/staff';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Functional component for viewing staff details
export default function ViewStaff({ staffId }: { staffId: string }) {
    const router = useRouter();

    const [staff, setStaff] = useState<Staff | null>(null);

    useEffect(() => {
        // Fetch staff data when the component mounts
        const fetchStaffData = async () => {
            try {
                const existingStaff = await getStaffById(parseInt(staffId));
                setStaff(existingStaff);
            } catch (error) {
                console.error("Error fetching staff data:", error);
            }
        };

        fetchStaffData();
    }, [staffId]);

    if (!staff) {
        return null; // You can render a loading spinner or message here
    }

    return (
        <>
            <Breadcrumbs previousName='Staff' currentName='Details' pageTitle="Staff Details" previousPath='/staff' />

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            View Staff
                        </h3>
                    </div>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Name
                            </label>
                            <div>{staff.name}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                CPR
                            </label>
                            <div>{staff.CPR}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Phone
                            </label>
                            <div>{staff.phone}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Hire Date
                            </label>
                            <div>{new Date(staff.hire_date).toLocaleDateString()}</div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Email
                            </label>
                            <div>{staff.email}</div>
                        </div>
                        {/* Display other staff information using <div> or <p> tags */}

                        {/* Back to List Button */}
                        <div className="flex mt-4">
                            {/* Back to List Button */}
                            <div className="mr-4">
                                <Link href="/staff" className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                    Back to List
                                </Link>
                            </div>

                            {/* Edit Staff Button */}
                            <div>
                                <Link href={`/staff/edit/${staffId}`}
                                    className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                    Edit Staff
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

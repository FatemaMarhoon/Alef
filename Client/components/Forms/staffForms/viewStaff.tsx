// Import necessary modules and components
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb2";
import { getStaffById } from '@/services/staffService';
import { Staff } from '@/types/staff';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getClassByStaffId } from '@/services/classService'; // Assuming you have a staff service
import { Class } from "@/types/class";
import NotFound from '@/components/Pages/404';
import NotAuthorized from '@/components/Pages/403';
import { currentPreschool } from "@/services/authService";
import Loader from "@/components/common/Loader"; // Import the Loader component
// Functional component for viewing staff details
export default function ViewStaff({ staffId }: { staffId: string }) {
    const router = useRouter();

    const [staff, setStaff] = useState<Staff | null>(null);
    const [staffClasses, setStaffClasses] = useState<Class[]>([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [notFound, setNotFound] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(true);
    useEffect(() => {
        // Fetch staff data when the component mounts
        const fetchStaffData = async () => {
            try {
                const existingStaff = await getStaffById(parseInt(staffId));
                setStaff(existingStaff);
                // Authorization check after staff data is fetched
                if (existingStaff && existingStaff.preschool_id !== (await currentPreschool())) {
                    setAuthorized(false);
                } else {
                    setAuthorized(true);
                }

                setLoading(false); // Set loading to false once data is fetched
                const result = await getClassByStaffId(staffId);
                console.log(result);
                // Check if the result has a "classes" property and it is an array
                if (result && result.classes && Array.isArray(result.classes)) {
                    setStaffClasses(result.classes);
                } else {
                    console.error("Error fetching staff classes: Unexpected response format", result);
                }

                console.log(result.classes);
            } catch (error) {
                console.error("Error fetching staff data:", error);
                setLoading(false)
            }
        };

        fetchStaffData();
    }, [staffId]);

    if (!staff) {
        return null; // You can render a loading spinner or message here
    }

    return (
        <>
            {loading && <Loader />}
            {!loading && !authorized && <NotAuthorized />}
            {!loading && notFound && <NotFound></NotFound>}
            {!loading && !notFound && authorized && (
                <>
                    <Breadcrumbs previousName='Staff' currentName='Details' pageTitle="Staff Details" previousPath='/staff' />

                    <div className="items-center justify-center min-h-screen">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Staff Profile                        </h3>
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
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Classes
                                    </label>
                                    <div>
                                        {Array.isArray(staffClasses) ? (
                                            staffClasses.map((classItem, key) => (
                                                <div key={key} className="mb-2.5">
                                                    {/* Render information about each class */}
                                                    <p className="flex items-center">
                                                        <span className="mr-2">{classItem.class_name}</span>
                                                        <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                                            <Link prefetch={false} href={`/class/view/${classItem.id}`}>
                                                                View Class
                                                            </Link>
                                                        </button>
                                                    </p>
                                                    {/* Add more details as needed */}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No classes found for this staff member.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Back to List Button */}
                                <div className="flex mt-4">
                                    {/* Back to List Button */}
                                    <div className="mr-4">
                                        <Link prefetch={false} href="/staff" className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                            Back to List
                                        </Link>
                                    </div>

                                    {/* Edit Staff Button */}
                                    <div>
                                        <Link prefetch={false} href={`/staff/edit/${staffId}`}
                                            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                                            Edit Staff
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

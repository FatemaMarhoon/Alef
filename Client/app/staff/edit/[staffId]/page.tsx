'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';
import { getStaffById, updateStaff } from '@/services/staffService'; // Assuming you have a staff service
import { Staff } from '@/types/staff';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import ErrorAlert from "@/components/ErrorAlert";
import { StaticValue } from "@/types/staticValue";
import { getStaffRoles } from "@/services/staticValuesService";
import NotFound from '@/components/Pages/404';
import NotAuthorized from '@/components/Pages/403';
import { currentPreschool } from "@/services/authService";
import Loader from "@/components/common/Loader"; // Import the Loader component
import Link from 'next/link';

export default function EditStaffForm({ params }: { params: { staffId: number } }) {
    const router = useRouter();
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");
    const [staffRoles, setStaffRoles] = useState<StaticValue[]>([]);

    const [staff, setStaff] = useState<Staff>({
        name: '',
        preschool_id: 0,
        staff_role_name: '',
        CPR: 0,
        phone: 0,
        hire_date: new Date()

    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true); // Added loading state
    const [notFound, setNotFound] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(true);
    useEffect(() => {
        // Fetch staff roles when the component mounts
        async function fetchStaffRoles() {
            try {
                const types = await getStaffRoles();
                setStaffRoles(types);
                console.log(types);
            } catch (error) {
                console.error("Error fetching staff Roles:", error);
            }
        }
        fetchStaffRoles();
    }, []);
    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const existingStaff = await getStaffById(params.staffId);
                setStaff(existingStaff);
                // Authorization check after staff data is fetched
                if (existingStaff && existingStaff.preschool_id !== (await currentPreschool())) {
                    setAuthorized(false);
                } else {
                    setAuthorized(true);
                }

                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching staff data:', error);
                setLoading(false); // Set loading to false once data is fetched

            }
        };

        fetchStaffData();
    }, [params.staffId]);

    const scrollToError = () => {
        // Assuming you have a ref for the error element
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedStaff: Staff = {
                ...staff,
                CPR: Number(staff.CPR),
                phone: Number(staff.phone),
            };

            const response = await updateStaff(params.staffId, updatedStaff);
            console.log('API Response:', response);
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
            router.push('/staff'); // Redirect after successful submission
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
            {loading && <Loader />}
            {!loading && !authorized && <NotAuthorized />}
            {!loading && notFound && <NotFound></NotFound>}
            {!loading && !notFound && authorized && (
                <>
                    <Breadcrumbs previousName='Staff' currentName='Edit' pageTitle="Edit Staff" previousPath='/staff' />
                    {error && <ErrorAlert message={error}></ErrorAlert>}

                    <div className="items-center justify-center min-h-screen">
                        <div className="flex flex-col gap-9">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">Edit Staff</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="p-6.5">
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Name <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={staff.name}
                                                onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                                                placeholder="Enter staff's name"
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.name ? 'border-error' : ''
                                                    }`}
                                            />
                                            {errors.name && (
                                                <p className="text-error text-sm mt-1">{errors.name}</p>
                                            )}
                                        </div>
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Role <span className="text-meta-1">*</span>
                                            </label>
                                            <select
                                                value={staff.staff_role_name}
                                                onChange={(e) => setStaff({ ...staff, staff_role_name: e.target.value })}
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.staff_role_name ? 'border-error' : ''
                                                    }`}
                                            >
                                                <option value="">Select Staff Role</option>

                                                {staffRoles.map((staff, index) => (
                                                    <option key={index} value={staff.ValueName}>
                                                        {staff.ValueName}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.staff_role_name && (
                                                <p className="text-error text-sm mt-1">{errors.staff_role_name}</p>
                                            )}
                                        </div>
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                CPR <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={staff.CPR}
                                                onChange={(e) => setStaff({ ...staff, CPR: parseInt(e.target.value) })}
                                                placeholder="Enter staff's name"
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.name ? 'border-error' : ''
                                                    }`}
                                            />
                                            {errors.name && (
                                                <p className="text-error text-sm mt-1">{errors.name}</p>
                                            )}
                                        </div>
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Phone <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={staff.phone}
                                                onChange={(e) => setStaff({ ...staff, phone: parseInt(e.target.value) })}
                                                placeholder="Enter staff's phone"
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.name ? 'border-error' : ''
                                                    }`}
                                            />
                                            {errors.name && (
                                                <p className="text-error text-sm mt-1">{errors.name}</p>
                                            )}
                                        </div>
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Hire Date <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                value={staff.hire_date ? new Date(staff.hire_date).toISOString().substring(0, 10) : ''}
                                                onChange={(e) => setStaff({ ...staff, hire_date: new Date(e.target.value) })}
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.DOB ? 'border-error' : ''
                                                    }`}
                                            />
                                            {errors.DOB && (
                                                <p className="text-error text-sm mt-1">{errors.DOB}</p>
                                            )}
                                        </div>
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Email <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={staff.email}
                                                onChange={(e) => setStaff({ ...staff, email: e.target.value })}
                                                placeholder="Enter staff's name"
                                                className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.name ? 'border-error' : ''
                                                    }`}
                                            />
                                            {errors.name && (
                                                <p className="text-error text-sm mt-1">{errors.name}</p>
                                            )}
                                        </div>
                                        {/* Add other input fields for CPR, phone, hire_date, and email */}
                                        {/* Similar to CreateStaffForm, add fields for other staff attributes */}

                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mb-4">
                                            Update
                                        </button>
                                        <Link prefetch={false}
                                            href="/class"
                                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"              >
                                            Back To List
                                        </Link>
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

// Import necessary modules and components
'use client';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { createStaff } from '@/services/staffService'; // Assuming you have a service for staff
import { useRouter } from 'next/navigation';
import { Staff } from '@/types/staff'; // Import the Staff interface
import { UserStorage } from "@/types/user";
import { StaticValue } from "@/types/staticValue";
import { currentPreschool } from '@/services/authService';
import { useSuccessMessageContext } from '../../../components/SuccessMessageContext';
import ErrorAlert from "@/components/ErrorAlert";
import { createUser } from '@/services/userService';
import { getStaffRoles } from "@/services/staticValuesService";
import Link from 'next/link';

export default function CreateStaffPage() {
    const router = useRouter();

    const [staffRole, setStaffRole] = useState("");
    const [staffName, setStaffName] = useState("");
    const [CPR, setCPR] = useState("");
    const [phone, setPhone] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { setSuccessMessage } = useSuccessMessageContext();
    const [error, setError] = useState("");
    const [staffRoles, setStaffRoles] = useState<StaticValue[]>([]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        // setErrors({});

        // // Validate form data
        // let hasErrors = false;

        // // Ensure staff role is not empty
        // if (!staffRole.trim()) {
        //     setErrors((prevErrors) => ({ ...prevErrors, staffRole: 'Staff role cannot be empty.' }));
        //     hasErrors = true;
        // }

        // // Ensure staff name is not empty
        // if (!staffName.trim()) {
        //     setErrors((prevErrors) => ({ ...prevErrors, staffName: 'Staff name cannot be empty.' }));
        //     hasErrors = true;
        // }

        // // Ensure CPR is a number and not empty
        // if (isNaN(Number(CPR)) || CPR.trim() === "") {
        //     setErrors((prevErrors) => ({ ...prevErrors, CPR: 'Please enter a valid CPR.' }));
        //     hasErrors = true;
        // }

        // // Ensure phone is a number and not empty
        // if (isNaN(Number(phone)) || phone.trim() === "") {
        //     setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a valid phone number.' }));
        //     hasErrors = true;
        // }

        // // Ensure hire date is not empty
        // if (!hireDate.trim()) {
        //     setErrors((prevErrors) => ({ ...prevErrors, hireDate: 'Hire date cannot be empty.' }));
        //     hasErrors = true;
        // }

        // if (hasErrors) {
        //     return;
        // }

        try {
            var preschool;
            await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
            const staffData: Staff = {
                staff_role_name: staffRole,
                name: staffName,
                CPR: Number(CPR),
                phone: Number(phone),
                hire_date: new Date(hireDate),
                email: email || undefined,
                preschool_id: preschool || 0,

            };

            // Log the complete staff data
            console.log('Staff Data:', staffData);

            // Send the request and log the response
            const response = await createStaff(staffData); // Assuming you have a createStaff function
            console.log('API Response:', response);
            const successMsg = response.data.message;
            if (response.status == 200 || response.status == 201) {
                setSuccessMessage(successMsg);
            } else if (response.status == 400 || response.status == 404 || response.status == 500) {
                setError(response.data.message);
            }
            // Check if the staff role is "teacher" before creating the user
            if (staffData.staff_role_name === 'Teacher') {
                // Create the user with information about the preschool
                await createUser(
                    staffData.email!,
                    staffData.name,
                    staffData.staff_role_name,
                    staffData.preschool_id
                );
            }

            // Redirect after successful submission
            router.push('/staff'); // Assuming you have a staff page
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
            <Breadcrumb pageName="Create Staff" />
            {error && <ErrorAlert message={error}></ErrorAlert>}

            <div className=" items-center justify-center min-h-screen">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Create Staff
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Staff Role <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        value={staffRole}
                                        onChange={(e) => setStaffRole(e.target.value)}
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.staffRole ? 'border-error' : ''
                                            }`}
                                    >
                                        <option value="">Select Staff Role</option>

                                        {staffRoles.map((staff, index) => (
                                            <option key={index} value={staff.ValueName}>
                                                {staff.ValueName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.staffRole && (
                                        <p className="text-error text-sm mt-1">{errors.staffRole}</p>
                                    )}
                                </div>


                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Staff Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={staffName}
                                        onChange={(e) => setStaffName(e.target.value)}
                                        placeholder="Enter staff's name"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.staffName ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.staffName && (
                                        <p className="text-error text-sm mt-1">{errors.staffName}</p>
                                    )}
                                </div>

                                {/* Add other input fields for CPR, phone, hire date, email, etc. */}

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        CPR <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={CPR}
                                        onChange={(e) => setCPR(e.target.value)}
                                        placeholder="Enter staff's CPR"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.CPR ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.CPR && (
                                        <p className="text-error text-sm mt-1">{errors.CPR}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Phone <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter staff's phone number"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.phone ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-error text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Hire Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={hireDate}
                                        onChange={(e) => setHireDate(e.target.value)}
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.hireDate ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.hireDate && (
                                        <p className="text-error text-sm mt-1">{errors.hireDate}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter staff's email"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary`}
                                    />
                                </div>

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mb-4">
                                    Create
                                </button>
                                <Link
                                    href="/staff"
                                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"              >
                                    Back To List
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
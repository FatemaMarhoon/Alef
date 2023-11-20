// Import necessary modules and components
'use client';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { createStaff } from '@/services/staffService'; // Assuming you have a service for staff
import { useRouter } from 'next/navigation';
import { Staff } from '@/types/staff'; // Import the Staff interface
import { UserStorage } from "@/types/user";
export default function CreateStaffPage() {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();

    const [staffRole, setStaffRole] = useState("");
    const [staffName, setStaffName] = useState("");
    const [CPR, setCPR] = useState("");
    const [phone, setPhone] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate form data
        let hasErrors = false;

        // Ensure staff role is not empty
        if (!staffRole.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, staffRole: 'Staff role cannot be empty.' }));
            hasErrors = true;
        }

        // Ensure staff name is not empty
        if (!staffName.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, staffName: 'Staff name cannot be empty.' }));
            hasErrors = true;
        }

        // Ensure CPR is a number and not empty
        if (isNaN(Number(CPR)) || CPR.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, CPR: 'Please enter a valid CPR.' }));
            hasErrors = true;
        }

        // Ensure phone is a number and not empty
        if (isNaN(Number(phone)) || phone.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a valid phone number.' }));
            hasErrors = true;
        }

        // Ensure hire date is not empty
        if (!hireDate.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, hireDate: 'Hire date cannot be empty.' }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            const staffData: Staff = {
                staff_role_name: staffRole,
                name: staffName,
                CPR: Number(CPR),
                phone: Number(phone),
                hire_date: new Date(hireDate),
                email: email || undefined, // Make email optional
                preschool_id: currentUser?.preschool_id || 0, // Assuming currentUser is available
            };

            // Log the complete staff data
            console.log('Staff Data:', staffData);

            // Send the request and log the response
            const response = await createStaff(staffData); // Assuming you have a createStaff function
            console.log('API Response:', response);

            // Redirect after successful submission
            router.push('/staff'); // Assuming you have a staff page
        } catch (error) {
            console.error("Error creating staff:", error);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Create Staff" />

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
                                    <input
                                        type="text"
                                        value={staffRole}
                                        onChange={(e) => setStaffRole(e.target.value)}
                                        placeholder="Enter staff's role"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.staffRole ? 'border-error' : ''
                                            }`}
                                    />
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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getStaffById, updateStaff } from '@/services/staffService'; // Assuming you have a staff service
import { UserStorage } from '@/types/user';
import { Staff } from '@/types/staff';

export default function EditStaffForm({ staffId }: { staffId: string }) {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();

    const [staff, setStaff] = useState<Staff>({
        preschool_id: 0,
        staff_role_name: '',
        name: '',
        CPR: 0,
        phone: 0,
        hire_date: new Date(),
        email: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const existingStaff = await getStaffById(parseInt(staffId));
                setStaff(existingStaff);
            } catch (error) {
                console.error('Error fetching staff data:', error);
            }
        };

        fetchStaffData();
    }, [staffId]);

    const focusOnFirstError = (errors: Record<string, string>) => {
        const firstErrorField = Object.keys(errors)[0];
        const errorFieldElement = document.querySelector(
            `[name="${firstErrorField}"]`
        ) as HTMLInputElement | null;

        if (errorFieldElement) {
            errorFieldElement.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});

        let hasErrors = false;

        if (!staff.name.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, name: 'Name cannot be empty.' }));
            hasErrors = true;
        }

        if (isNaN(Number(staff.CPR)) || staff.CPR.toString().trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, CPR: 'Please enter a valid CPR.' }));
            hasErrors = true;
        }

        if (isNaN(Number(staff.phone)) || staff.phone.toString().trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a valid phone number.' }));
            hasErrors = true;
        }

        if (hasErrors) {
            setTimeout(() => {
                focusOnFirstError(errors);
            }, 0);
            return;
        }

        try {
            const updatedStaff: Staff = {
                ...staff,
                CPR: Number(staff.CPR),
                phone: Number(staff.phone),
            };

            const response = await updateStaff(parseInt(staffId), updatedStaff);
            console.log('API Response:', response);

            router.push('/staff'); // Redirect after successful submission
        } catch (error) {
            console.error('Error updating staff:', error);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Edit Staff" />

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
                                    <input
                                        type="text"
                                        value={staff.staff_role_name}
                                        onChange={(e) => setStaff({ ...staff, staff_role_name: e.target.value })}
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
                                        Hire Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={new Date(staff.hire_date).toLocaleDateString()}
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

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

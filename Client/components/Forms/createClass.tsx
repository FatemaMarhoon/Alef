// Import necessary modules and components
'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { createClass } from '@/services/classService';
import { useRouter } from 'next/navigation';
import { Class } from '@/types/class';
import { UserStorage } from "@/types/user";
import { getStaff } from '@/services/staffService'; // Assuming you have this service
import { Staff } from '@/types/staff';

interface ClassFormProps {
    onCreateClasses: (newClasses: Class[]) => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ onCreateClasses }) => {
    const currentUser = UserStorage.getCurrentUser();
    const router = useRouter();
    const [grade, setGrade] = useState('');

    const [numClasses, setNumClasses] = useState(0);
    const [classData, setClassData] = useState<Array<{ class_name: string, supervisor: string, classroom: string, capacity: number }>>(
        Array.from({ length: numClasses }, () => ({ class_name: '', supervisor: '', classroom: '', capacity: 0 }))
    );


    const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGrade(e.target.value);
    };

    const handleNumClassesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumClasses = Number(e.target.value);
        setNumClasses(newNumClasses);
        setClassData(Array.from({ length: newNumClasses }, () => ({
            class_name: '',
            supervisor: '',
            classroom: '',
            capacity: 0,
        })));
    };

    const handleClassnameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        updateClassData(index, 'class_name', e.target.value);
    };
    const [selectedSupervisors, setSelectedSupervisors] = useState<string[]>([]);

    const handleSupervisorChange = (selectedSupervisorId: string, index: number) => {
        updateClassData(index, 'supervisor', selectedSupervisorId);
        setSelectedSupervisors((prevSelected) => [...prevSelected, selectedSupervisorId]);
    };




    const handleClassroomChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        updateClassData(index, 'classroom', e.target.value);
    };

    const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        updateClassData(index, 'capacity', Number(e.target.value));
    };

    const updateClassData = (index: number, key: keyof Class, value: string | number) => {
        setClassData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], [key]: value };
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Create an array of promises for each class creation
            const createClassPromises = classData.map(async (classInfo) => {
                const newClass: Class = {
                    preschool_id: currentUser?.preschool_id, // Replace with the actual preschool ID
                    grade,
                    ...classInfo,
                };

                return createClass(newClass);
            });

            // Wait for all class creations to complete
            const createdClasses = await Promise.all(createClassPromises);

            // Pass the created classes to the parent component or perform any other actions
            onCreateClasses(createdClasses);

            //push to another page
            router.push('/class');

        } catch (error) {
            // Handle error
            console.error("Error creating classes:", error);
        }
    };

    const [staffList, setStaffList] = useState<Staff[]>([]);

    // Fetch staff members when the component mounts
    useEffect(() => {
        async function fetchStaffList() {
            try {
                const response = await getStaff();
                console.log('Staff List Response:', response);

                // Log the response.data or the actual array
                console.log('Staff List Data:', response.data || response);

                setStaffList(response || []); // Assuming response.data is the array of staff
                // Set loading to false after fetching data (if needed)
                console.log("staffff", staffList);
            } catch (error) {
                console.error("Error fetching staff list:", error);
                setStaffList([]);
                // Set loading to false in case of an error (if needed)
            }
        }

        fetchStaffList();
    }, [getStaff]); // Empty

    return (
        <div className=" items-center justify-center min-h-screen">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Create Class
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Grade <span className="text-meta-1">*</span>
                            </label>
                            <select
                                name="grade"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                <option value="">Select Grade</option>
                                <option value="KG1">KG1</option>
                                <option value="KG2">KG2</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Number of Classes <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="number"
                                name="numClasses"
                                value={numClasses}
                                onChange={(e) => {
                                    setNumClasses(Number(e.target.value));
                                    setClassData(Array.from({ length: Number(e.target.value) }, () => ({
                                        class_name: '',
                                        supervisor: '',
                                        classroom: '',
                                        capacity: 0,
                                    })));
                                }}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        {/* Inputs for each class */}
                        {classData.map((classInfo, index) => (
                            <div key={index} className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Class Name {index + 1} <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name={`class_name-${index}`}
                                    value={classInfo.class_name}
                                    onChange={(e) => handleClassnameChange(e, index)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Supervisor <span className="text-meta-1">*</span>
                                </label>
                                <select
                                    key={index}
                                    name={`supervisor-${index}`}
                                    value={classInfo.supervisor}
                                    onChange={(e) => handleSupervisorChange(e.target.value, index)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                >
                                    <option value="">Select Supervisor</option>
                                    {staffList.map((supervisor, optionIndex) => (
                                        <option key={optionIndex} value={supervisor.id}>
                                            {supervisor.name}
                                        </option>
                                    ))}
                                </select>



                                <label className="mb-2.5 block text-black dark:text-white">
                                    Classroom <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name={`classroom-${index}`}
                                    value={classInfo.classroom}
                                    onChange={(e) => handleClassroomChange(e, index)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Capacity <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    name={`capacity-${index}`}
                                    value={classInfo.capacity}
                                    onChange={(e) => handleCapacityChange(e, index)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        ))}
                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClassForm;

// Import necessary modules and components
'use client';
import { useState, useEffect, useRef } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { createClass } from '@/services/classService';
import { useRouter } from 'next/navigation';
import { Class } from '@/types/class';
import { UserStorage } from "@/types/user";
import { getStaff } from '@/services/staffService';
import { Staff } from '@/types/staff';
import { getGrades, getGradeCapacityById } from '@/services/gradeCapacityService';
import { GradeCapacity } from '@/types/gradeCapacity';
import { format } from 'url';
import Link from 'next/link';

interface ClassFormProps {
    onCreateClasses: (newClasses: Class[]) => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ onCreateClasses }) => {
    //declare variables
    const currentUser = UserStorage.getCurrentUser();
    const router = useRouter();
    const [grade, setGrade] = useState('');
    const [numClasses, setNumClasses] = useState(0);
    const [classData, setClassData] = useState<Array<{ class_name: string, supervisor: string, classroom: string, capacity: number }>>(
        Array.from({ length: numClasses }, () => ({ class_name: '', supervisor: '', classroom: '', capacity: 0 })));
    const [selectedSupervisors, setSelectedSupervisors] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [gradesList, setGradesList] = useState<GradeCapacity[]>([]);
    const [selectedGradeCapacity, setSelectedGradeCapacity] = useState<number | null>(null);



    const handleClassnameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        updateClassData(index, 'class_name', e.target.value);
    };

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

    // const handleGradeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     console.log("Selected Grade ID:", e.target.value); // Add this line to log the selected grade ID

    //     const selectedGradeId = e.target.value;
    //     // Find the corresponding grade value based on the selected grade ID
    //     const selectedGrade = gradesList.find(grade => grade.id === Number(selectedGradeId));
    //     if (selectedGrade) {
    //         const gradeValue = selectedGrade.grade;
    //         setGrade(gradeValue);
    //         console.log(grade);
    //     }
    //     try {
    //         // Assuming you have a function to fetch grade capacity by ID
    //         const response = await getGradeCapacityById(selectedGradeId);
    //         console.log(response);
    //         // Assuming the response contains the grade capacity
    //         const gradeCapacity = response?.capacity || null;

    //         setSelectedGradeCapacity(gradeCapacity);
    //     } catch (error) {
    //         console.error("Error fetching grade capacity:", error);
    //     }
    // };

    const handleGradeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGradeId = e.target.value;

        try {
            // Assuming you have a function to fetch grade capacity by ID
            const response = await getGradeCapacityById(selectedGradeId);
            console.log(response);

            // Assuming the response contains the grade capacity
            const gradeCapacity = response?.capacity || null;

            setSelectedGradeCapacity(gradeCapacity);

            // Find the corresponding grade name based on the selected grade ID
            const selectedGrade = gradesList.find(grade => grade.id === Number(selectedGradeId));
            if (selectedGrade) {
                const gradeName = selectedGrade.grade;
                setGrade(gradeName);
            }
        } catch (error) {
            console.error("Error fetching grade capacity:", error);
        }
    };



    const handleNumClassesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumClasses = Number(e.target.value);
        setNumClasses(newNumClasses);

        // Calculate default class capacities
        const defaultClassCapacities = calculateDefaultClassCapacity(selectedGradeCapacity, newNumClasses);

        // Update classData with default capacities
        setClassData(Array.from({ length: newNumClasses }, (_, index) => ({
            class_name: '',
            supervisor: '',
            classroom: '',
            capacity: defaultClassCapacities[index],
        })));

    };

    const calculateDefaultClassCapacity = (gradeCapacity: number | null, numClasses: number): number => {
        if (gradeCapacity !== null && !isNaN(gradeCapacity) && !isNaN(numClasses) && numClasses > 0) {
            // Divide the selected grade capacity by the number of classes
            const baseCapacity = Math.floor(gradeCapacity / numClasses);

            // Calculate the remainder
            const remainder = gradeCapacity % numClasses;

            // Distribute the remainder to the first few classes
            const distributedCapacity = Array.from({ length: numClasses }, (_, index) =>
                baseCapacity + (index < remainder ? 1 : 0)
            );

            // Return the capacity for the specific class index
            return distributedCapacity;
        }
        return 0;
    };



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
    }, []); // Empty



    // Fetch grades when the component mounts
    useEffect(() => {
        async function fetchGradesList() {
            try {
                const response = await getGrades();
                console.log('Grade List Response:', response);

                // Log the response.data or the actual array
                console.log('Grade List Data:', response || response);

                setGradesList(response || []);
                // Set loading to false after fetching data (if needed)
                console.log("staffff", staffList);
            } catch (error) {
                console.error("Error fetching staff list:", error);
                setStaffList([]);
                // Set loading to false in case of an error (if needed)
            }
        }

        fetchGradesList();
    }, []); // Empty

    //handle form submitting
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Calculate the sum of class capacities
            const totalCapacity = classData.reduce((sum, classInfo) => sum + classInfo.capacity, 0);

            // Check if the total capacity exceeds the grade capacity
            if (selectedGradeCapacity !== null && totalCapacity > selectedGradeCapacity) {
                // Display an error message (you can use a state to manage the error message)
                console.error("Error: Total capacity exceeds grade capacity.");
                setErrorMessage("Error: Total capacity exceeds grade capacity.");
                // If there's an error, set the form error and scroll to the error ref
                setErrorMessage("Error: Total capacity exceeds grade capacity.");
                ("An error occurred while creating classes. Please try again.");
                if (errorRef.current) {
                    errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } return; // Prevent form submission
            }

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

            // Redirect to the new page with query parameters
            router.push(
                format({
                    pathname: '/class/view2',
                    query: {
                        numClasses,
                        grade,
                    },
                })
            );

            // <Link href={{ pathname: `class/view2`, query: { numClasses, grade } }}> </Link>


        } catch (error) {
            // Handle error
            console.error("Error creating classes:", error);
            setErrorMessage("Error creating classes");
            if (errorRef.current) {
                errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

        }
    };


    return (
        <div className=" items-center justify-center min-h-screen">
            <div className="flex flex-col gap-9">
                {/* Error message */}
                {errorMessage && (
                    <div ref={errorRef} className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                        {errorMessage}
                    </div>
                )}
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
                                value={grade} // Use grade directly instead of e.target.value
                                onChange={handleGradeChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                <option value="">Select Grade</option>
                                {gradesList.map((grade, optionIndex) => (
                                    <option key={optionIndex} value={grade.id}>
                                        {grade.grade}
                                    </option>
                                ))}
                            </select>

                        </div>
                        {grade && (
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Grade Capacity <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    value={selectedGradeCapacity !== null ? selectedGradeCapacity.toString() : ''}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />

                            </div>
                        )}

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Number of Classes <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="number"
                                name="numClasses"
                                value={numClasses}
                                onChange={(e) => {
                                    handleNumClassesChange(e)
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
            </div >
        </div >
    );
};

export default ClassForm;

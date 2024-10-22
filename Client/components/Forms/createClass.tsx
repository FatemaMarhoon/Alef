/* eslint-disable react-hooks/exhaustive-deps */
// Import necessary modules and components
'use client';
import { useState, useEffect, useRef } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';
import { createClass, getSumOfClassCapacitiesByGrade } from '@/services/classService';
import { useRouter } from 'next/navigation';
import { Class } from '@/types/class';

import { getNotAssignedStaff } from '@/services/staffService';
import { Staff } from '@/types/staff';
import { getGrades, getGradeCapacityById } from '@/services/gradeCapacityService';
import { GradeCapacity } from '@/types/gradeCapacity';
import { format } from 'url';
import Loader from "@/components/common/Loader"; // Import the Loader component
import ErrorAlert from '../ErrorAlert';
import { currentUser, currentPreschool } from '@/services/authService';
import Link from 'next/link';


const ClassForm: React.FC = ({ }) => {
    //declare variables
    const router = useRouter();
    const [numClasses, setNumClasses] = useState(0);
    const [classData, setClassData] = useState<Array<{
        class_name: string, supervisor: string, classroom: string,
        capacity: number
    }>>(
        Array.from({ length: numClasses }, () => ({ class_name: '', supervisor: '', classroom: '', capacity: 0 })));
    const [selectedSupervisors, setSelectedSupervisors] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [gradesList, setGradesList] = useState<GradeCapacity[]>([]);
    const [selectedGradeCapacity, setSelectedGradeCapacity] = useState<number | null>(null);
    const [selectedClassesCapacity, setSelectedClassesCapacity] = useState<number | null>(null);

    const [remainingCapacity, setRemainingCapacity] = useState<number | null>(null);

    const [grade, setGrade] = useState('');
    const [selectedGradeId, setSelectedGradeId] = useState('');
    const [selectedSupervisor, setSelectedSupervisor] = useState('');
    // Introduce a loading state
    const [loading, setLoading] = useState(true);



    // Fetch grades when the component mounts
    useEffect(() => {
        async function fetchGradesList() {
            try {
                setLoading(true);

                const response = await getGrades();
                console.log('Grade List Response:', response);

                // Log the response.data or the actual array
                console.log('Grade List Data:', response || response);

                setGradesList(response || []);
                // Set loading to false after fetching data (if needed)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching staff list:", error);
                setStaffList([]);
                // Set loading to false in case of an error (if needed)
                setLoading(false);
            }
        }

        fetchGradesList();
    }, []); // Empty

    const handleGradeChange = async (e: React.ChangeEvent<HTMLSelectElement>, selectedId: string) => {
        console.log("handleGradeChange called"); // Add this line

        //const selectedGradeId = e.target.value;

        console.log("Selected Grade ID:", selectedGradeId);

        try {
            // Find the corresponding grade name based on the selected grade ID
            const selectedGrade = gradesList.find(grade => grade.id === Number(selectedId));
            if (selectedGrade) {
                const gradeName = selectedGrade.grade;
                setGrade(gradeName);

            }

            // Assuming you have a function to fetch grade capacity by ID
            const response = await getGradeCapacityById(selectedId);
            console.log(response);

            // Assuming the response contains the grade capacity
            const gradeCapacity = response?.capacity || null;
            // Ensure gradeCapacity is a number before setting it
            const numericGradeCapacity = typeof gradeCapacity === 'number' ? gradeCapacity : null;

            setSelectedGradeCapacity(numericGradeCapacity);
            setLoading(false);


        } catch (error) {
            setLoading(false);

            console.error("Error fetching grade capacity:", error);
        }
    };


    useEffect(() => {
        console.log("Grade:", (grade));

        async function fetchData() {
            try {

                // Fetch the sum of class capacities for the grade
                const sumOfClassCapacitiesResponse = await getSumOfClassCapacitiesByGrade(grade);
                const sumOfClassCapacities = sumOfClassCapacitiesResponse?.sumOfCapacities;
                setSelectedClassesCapacity(sumOfClassCapacities);

                const numericGradeCapacity = parseInt(selectedGradeCapacity!.toString(), 10); // Use the appropriate radix

                console.log(numericGradeCapacity - sumOfClassCapacities);
                setSelectedClassesCapacity(sumOfClassCapacities);
                const remainingCapacity = numericGradeCapacity - sumOfClassCapacities;
                setRemainingCapacity(remainingCapacity);
            } catch (error) {
                console.error("Error fetching sum of class capacities:", error);
            }
        };

        fetchData();
    }, [grade, selectedGradeCapacity]);

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

    const handleNumClassesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumClasses = Number(e.target.value);
        setNumClasses(newNumClasses);

        // Calculate default class capacities
        const defaultClassCapacities = calculateDefaultClassCapacity(remainingCapacity, newNumClasses);

        // Update classData with default capacities
        setClassData(Array.from({ length: newNumClasses }, (_, index) => ({
            class_name: '',
            supervisor: '',
            classroom: '',
            capacity: defaultClassCapacities[index],
        })));

    };

    const calculateDefaultClassCapacity = (remainingCapacity: number | null, numClasses: number): number[] => {
        if (remainingCapacity !== null && !isNaN(remainingCapacity) && !isNaN(numClasses) && numClasses > 0) {
            // Divide the selected grade capacity by the number of classes
            const baseCapacity = Math.floor(remainingCapacity / numClasses);

            // Calculate the remainder
            const remainder = remainingCapacity % numClasses;

            // Distribute the remainder to the first few classes
            const distributedCapacity: number[] = Array.from({ length: numClasses }, (_, index) =>
                baseCapacity + (index < remainder ? 1 : 0)
            );

            // Return the array of capacities for each class
            return distributedCapacity;
        }
        return Array(numClasses).fill(0);
    };


    // Fetch staff members when the component mounts
    useEffect(() => {
        async function fetchStaffList() {
            try {
                const response = await getNotAssignedStaff();
                console.log('Staff List Response:', response);

                // Log the response.data or the actual array
                // console.log('Staff List Data:', response.data || response);

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


    // handle form submitting
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Calculate the sum of class capacities
            const totalCapacity = classData.reduce((sum, classInfo) => sum + classInfo.capacity, 0);

            // Check if the total capacity exceeds the grade capacity
            if (remainingCapacity !== null && totalCapacity > remainingCapacity) {
                // Display an error message (you can use a state to manage the error message)
                console.error("Error: Total capacity exceeds grade capacity.");
                setErrorMessage("Error: Total capacity exceeds grade capacity.");
                // If there's an error, set the form error and scroll to the error ref
                setErrorMessage("Error: Total capacity exceeds grade capacity.");
                ("An error occurred while creating classes. Please try again.");
                if (errorRef.current) {
                    errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                return; // Prevent form submission
            }
            const preschoolId = await currentPreschool();

            let preschool_id: number = 0;
            // Check if preschoolId is not undefined and is of type number
            if (preschoolId !== undefined && typeof preschoolId === 'number') {
                preschool_id = preschoolId;
                console.log("Preschool ID:", preschool_id);
            } else {
                console.error("Invalid Preschool ID:", preschoolId);
            }
            // Create an array of promises for each class creation
            const createClassPromises = classData.map(async (classInfo) => {
                const newClass: Class = {
                    id: 0,
                    preschool_id: preschool_id, // Provide a default value if currentUser is undefined
                    grade,
                    ...classInfo
                };
                console.log(newClass, await currentPreschool());
                return createClass(newClass);
            });

            // Wait for all class creations to complete
            Promise.all(createClassPromises)
                .then((createdClasses) => {
                    console.log('Created Classes:', createdClasses);

                    const classIds = createdClasses.map((createdClass) => createdClass?.newClass?.id).filter(Boolean);

                    console.log('Class IDs:', classIds);

                    const validClassIDs = classIds.filter((id) => id !== undefined && id !== 0);

                    if (validClassIDs.length === 0) {
                        console.error('No valid class IDs found.');
                        return; // or handle the error in an appropriate way
                    }

                    const classIDsQueryString = validClassIDs.join(',');
                    console.log(classIDsQueryString);

                    // Redirect to the new page with query parameters
                    router.push(
                        format({
                            pathname: '/class/view2',
                            query: {
                                numClasses,
                                // grade: getGradeName(grade),
                                grade,
                                classIds: classIDsQueryString
                            },
                        })
                    );
                })
                .catch((error) => {
                    // Handle error
                    console.error("Error creating classes:", error);
                    setErrorMessage(error.response.data.message)
                    //setErrorMessage(error.response.data.message);
                    if (errorRef.current) {
                        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });

        } catch (error) {
            // Handle error
            console.error("Error creating classes:", error);
            setErrorMessage("Error creating classes");
            if (errorRef.current) {
                errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const getGradeName = (selectedGradeId: string) => {
        const selectedGrade = gradesList.find((grade) => grade.id === Number(selectedGradeId));
        return selectedGrade ? selectedGrade.grade : "";
    };

    if (loading) {
        // You can add loading or error handling here
        {
            return (
                <Loader />
            )
        }
    }
    return (
        <><Breadcrumbs previousName='Classes' currentName='Create' pageTitle="Create Class" previousPath='/class' />
            <div className=" items-center justify-center min-h-screen">
                <div className="flex flex-col gap-9">

                    {errorMessage && <ErrorAlert message={errorMessage}></ErrorAlert>}
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
                                    value={selectedGradeId} // Use grade directly instead of e.target.value
                                    onChange={(e) => {
                                        handleGradeChange(e, e.target.value);
                                        setSelectedGradeId(e.target.value);

                                    }}
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
                                        {grade}     Grade Capacity
                                    </label>
                                    <p>
                                        {selectedGradeCapacity !== null ? selectedGradeCapacity.toString() : ''}
                                    </p>
                                </div>
                            )}

                            {grade && (
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Current Classes Capacity
                                    </label>
                                    <p>                                    {selectedClassesCapacity !== null ? selectedClassesCapacity.toString() : ''}
                                    </p>
                                </div>
                            )}

                            {grade && (
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Current Remaining Capacity
                                    </label>
                                    <p>
                                        {remainingCapacity !== null ? remainingCapacity.toString() : ''}
                                    </p>
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
                                        handleNumClassesChange(e);
                                    }}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Supervisor <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        key={index}
                                        name={`supervisor-${index}`}
                                        value={classInfo.supervisor}
                                        onChange={(e) => {
                                            handleSupervisorChange(e.target.value, index);
                                            setSelectedSupervisor(e.target.value);
                                        }}
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
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Capacity <span className="text-meta-1">*</span>
                                    </label>

                                    <input
                                        type="number"
                                        name={`capacity-${index}`}
                                        value={classInfo.capacity}
                                        onChange={(e) => handleCapacityChange(e, index)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />

                                </div>
                            ))}
                            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mb-4">
                                Create
                            </button>
                            <Link prefetch={false}
                                href="/class"
                                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                Back To List
                            </Link>
                        </form>

                    </div>

                </div>
            </div></>
    );
};

export default ClassForm;

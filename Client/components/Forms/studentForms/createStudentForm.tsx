// Import necessary modules and components
'use client';
import { useState, ChangeEvent } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { createStudent } from '@/services/studentService';
import { useRouter } from 'next/navigation';
import { Student } from '@/types/student';
import { UserStorage } from "@/types/user";

export default function CreateForm() {
    const router = useRouter();
    const currentUser = UserStorage.getCurrentUser();

    const [studentName, setStudentName] = useState("");
    const [DOB, setDOB] = useState("");
    const [CPR, setCPR] = useState("");
    const [contactNumber1, setContactNumber1] = useState("");
    const [contactNumber2, setContactNumber2] = useState("");
    const [guardianName, setGuardianName] = useState("");
    const [enrollmentDate, setEnrollmentDate] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const [gender, setGender] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [personal_picture, setPersonalPicture] = useState<File | undefined>(undefined);
    const [passport, setPassport] = useState<File | undefined>(undefined);
    const [certificate_of_birth, setCertificateOfBirth] = useState<File | undefined>(undefined);

    // Update the handleFileChange function
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | undefined>>) => {
        const file = e.target.files?.[0];
        setFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate form data
        let hasErrors = false;

        // Ensure student name is not empty
        if (!studentName.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, studentName: 'Student name cannot be empty.' }));
            hasErrors = true;
        }
        if (!guardianName.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, guardianName: 'Guardian name cannot be empty.' }));
            hasErrors = true;
        }

        if (!medicalHistory.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, medicalHistory: 'Medical History cannot be empty.' }));
            hasErrors = true;
        }
        // Ensure CPR is a number and not empty
        if (isNaN(Number(CPR)) || CPR.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, CPR: 'Please enter a valid CPR.' }));
            hasErrors = true;
        }

        // Ensure contact numbers are numbers and not empty
        if (isNaN(Number(contactNumber1)) || contactNumber1.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, contactNumber1: 'Please enter a valid contact number.' }));
            hasErrors = true;
        }

        if (isNaN(Number(contactNumber2)) || contactNumber2.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, contactNumber2: 'Please enter a valid contact number.' }));
            hasErrors = true;
        }

        // Inside handleSubmit function

        // Validate Contact Number 1
        const contactNumber1Regex = /^\d{8}$/; // Assuming a 10-digit phone number
        if (!contactNumber1.trim() || !contactNumber1Regex.test(contactNumber1)) {
            setErrors((prevErrors) => ({ ...prevErrors, contactNumber1: 'Please enter a valid Contact Number.' }));
            hasErrors = true;
        }

        // Validate Contact Number 2
        const contactNumber2Regex = /^\d{8}$/; // Assuming a 10-digit phone number
        if (!contactNumber2.trim() || !contactNumber2Regex.test(contactNumber2)) {
            setErrors((prevErrors) => ({ ...prevErrors, contactNumber2: 'Please enter a valid Contact Number.' }));
            hasErrors = true;
        }


        // Validate Date of Birth
        if (!DOB.trim() || isNaN(Date.parse(DOB))) {
            setErrors((prevErrors) => ({ ...prevErrors, DOB: 'Please enter a valid Date of Birth.' }));
            hasErrors = true;
        }

        // Validate Enrollment Date
        if (!enrollmentDate.trim() || isNaN(Date.parse(enrollmentDate))) {
            setErrors((prevErrors) => ({ ...prevErrors, enrollmentDate: 'Please enter a valid Enrollment Date.' }));
            hasErrors = true;
        }

        // Inside handleSubmit function

        // Validate Gender
        if (gender === "") {
            setErrors((prevErrors) => ({ ...prevErrors, gender: 'Please select a valid Gender.' }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            const studentData: Student = {
                student_name: studentName,
                DOB: new Date(DOB),
                CPR: Number(CPR),
                contact_number1: Number(contactNumber1),
                contact_number2: Number(contactNumber2),
                guardian_name: guardianName,
                enrollment_date: new Date(enrollmentDate),
                medical_history: medicalHistory,
                preschool_id: currentUser?.preschool_id,
                gender: gender,
                personal_picture,
                certificate_of_birth,
                passport
            };

            // Log the complete student data
            console.log('Student Data:', studentData);

            // Send the request and log the response
            const response = await createStudent(studentData);
            console.log('API Response:', response);

            // Redirect after successful submission
            router.push('/students');
        } catch (error) {
            console.error("Error creating student:", error);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Create Student" />

            <div className=" items-center justify-center min-h-screen">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Create Student
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Student Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        placeholder="Enter student's name"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.studentName ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.studentName && (
                                        <p className="text-error text-sm mt-1">{errors.studentName}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Date of Birth <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={DOB}
                                        onChange={(e) => setDOB(e.target.value)}
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.DOB ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.studentName && (
                                        <p className="text-error text-sm mt-1">{errors.DOB}</p>
                                    )}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">Gender:</label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.gender ? 'border-error' : ''
                                            }`}
                                    >
                                        <option value={""}>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="text-error text-sm mt-1">{errors.gender}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        CPR <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={CPR}
                                        onChange={(e) => setCPR(e.target.value)}
                                        placeholder="Enter student's CPR"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.CPR ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.CPR && (
                                        <p className="text-error text-sm mt-1">{errors.CPR}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contact Number 1<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={contactNumber1}
                                        onChange={(e) => setContactNumber1(e.target.value)}
                                        placeholder="Enter student's Contact Number"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.contactNumber1 ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.contactNumber1 && (
                                        <p className="text-error text-sm mt-1">{errors.contactNumber1}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contact Number 2<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={contactNumber2}
                                        onChange={(e) => setContactNumber2(e.target.value)}
                                        placeholder="Enter student's Contact Number"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.contactNumber2 ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.contactNumber2 && (
                                        <p className="text-error text-sm mt-1">{errors.contactNumber2}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Guardian Name<span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={guardianName}
                                        onChange={(e) => setGuardianName(e.target.value)}
                                        placeholder="Enter student's Guardian Name"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.guardianName ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.guardianName && (
                                        <p className="text-error text-sm mt-1">{errors.guardianName}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Enrollment Date <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={enrollmentDate}
                                        onChange={(e) => setEnrollmentDate(e.target.value)}
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.enrollmentDate ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.enrollmentDate && (
                                        <p className="text-error text-sm mt-1">{errors.enrollmentDate}</p>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Medical History <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={medicalHistory}
                                        onChange={(e) => setMedicalHistory(e.target.value)}
                                        placeholder="Enter student's medical history"
                                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.medicalHistory ? 'border-error' : ''
                                            }`}
                                    />
                                    {errors.guardianName && (
                                        <p className="text-error text-sm mt-1">{errors.medicalHistory}</p>
                                    )}
                                </div>

                                {/* Personal Picture */}
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Personal Picture <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        // name="personal_picture"
                                        onChange={(e) => handleFileChange(e, setPersonalPicture)}
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Certificate of Birth */}
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Certificate of Birth <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        // name="certificate_of_birth"
                                        onChange={(e) => handleFileChange(e, setCertificateOfBirth)}
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Passport */}
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Passport <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        // name="passport"
                                        onChange={(e) => handleFileChange(e, setPassport)}
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
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

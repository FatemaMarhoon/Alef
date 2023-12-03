import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getClasses, getClassById } from '@/services/classService';
import { Student } from '@/types/student';
import { getStudentsByClassId } from '@/services/studentService';
import { Class } from '@/types/class';

interface TripFormData {
    studentName: string;
    className: string;
    date: string;
    place: string;
    price: string;
    info: string;
    guardianAgree: boolean;
    guardianDisagree: boolean;
    signature: string;
}

interface TripReportFormProps {
    onSubmit: SubmitHandler<TripFormData>;
}


// ... (imports remain unchanged)

const TripReportForm: React.FC<TripReportFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, setValue } = useForm<TripFormData>();
    const [classDetails, setClassDetails] = useState<Class | null>(null);
    const [classList, setClassList] = useState<Class[]>([]); // List of classes
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedClassId, setselectedClassId] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const classesData = await getClasses();
                setClassList(classesData);

                const initialClass = classesData[0];
                setValue('className', initialClass.id.toString());
                const classDetailsData = await getClassById(initialClass.id.toString());
                setClassDetails(classDetailsData);

                const studentsData = await getStudentsByClassId(classDetailsData.id.toString());

                setStudents(studentsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleClassChange = async (selectedClassId: string) => {
        setValue('className', selectedClassId);
        const classDetailsData = await getClassById(selectedClassId);
        setClassDetails(classDetailsData);

        const studentsData = await getStudentsByClassId(selectedClassId);
        setStudents(studentsData);
    };

    return (
        <form
            onSubmit={handleSubmit((formData) => {
                const selectedStudent = students.find((student) => student.student_name === formData.studentName);

                if (selectedStudent) {
                    const tripReport: TripFormData = {
                        ...formData,
                        studentName: selectedStudent.student_name,
                    };
                    onSubmit(tripReport);
                }
            })}

            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark"
        >
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Trip Report Generation</h3>
            </div>
            <div className="p-6.5">
                <div className="mb-4.5">
                    <label htmlFor="className" className="mb-2.5 block text-black dark:text-white">
                        Class <span className="text-meta-1">*</span>
                    </label>
                    <select
                        {...register('className', { required: true })}
                        onChange={(e) => {
                            handleClassChange(e.target.value);
                        }
                        }
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    >
                        <option value="" disabled>
                            Select a class
                        </option>
                        {classList.map((classItem) => (
                            <option key={classItem.id} value={classItem.id}>
                                {classItem.class_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4.5">
                    <label htmlFor="studentName" className="mb-2.5 block text-black dark:text-white">
                        Student Name <span className="text-meta-1">*</span>
                    </label>
                    <select
                        {...register('studentName', { required: true })}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    >
                        <option value="" disabled>
                            Select a student
                        </option>
                        {students.map((student) => (
                            <option key={student.id} value={student.student_name}>
                                {student.student_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4.5">
                    <label htmlFor="date" className="mb-2.5 block text-black dark:text-white">
                        Date <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="date"
                        {...register('date', { required: true })}
                        placeholder="Enter date"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
                <div className="mb-4.5">
                    <label htmlFor="place" className="mb-2.5 block text-black dark:text-white">
                        Place <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="text"
                        {...register('place', { required: true })}
                        placeholder="Enter trip place"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
                <div className="mb-4.5">
                    <label htmlFor="price" className="mb-2.5 block text-black dark:text-white">
                        Price <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="text"
                        {...register('price', { required: true })}
                        placeholder="Enter trip price"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
                <div className="mb-4.5">
                    <label htmlFor="info" className="mb-2.5 block text-black dark:text-white">
                        Info <span className="text-meta-1">*</span>
                    </label>
                    <textarea
                        {...register('info', { required: true })}
                        placeholder="Enter trip info"
                        rows={4} // Specify the number of rows
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
                <div className="mb-4.5">
                    <label htmlFor="signature" className="mb-2.5 block text-black dark:text-white">
                        Signature <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="text"
                        {...register('signature', { required: true })}
                        placeholder="Enter signature"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                    Generate Trip Report
                </button>
            </div>

        </form>
    );
};

export default TripReportForm;
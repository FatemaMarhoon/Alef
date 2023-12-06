import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getClasses, getClassById } from '@/services/classService';
import { Student } from '@/types/student';
import { getStudentsByClassId } from '@/services/studentService';
import { Class } from '@/types/class';
import html2pdf from 'html2pdf.js';
import ReactDOM from 'react-dom';

interface InvoiceFormData {
    studentName: string;
    className: string;
    date: string;
    description: string;
    amount: string;
}

interface InvoiceFormProps {
    onSubmit: SubmitHandler<InvoiceFormData>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, setValue } = useForm<InvoiceFormData>();
    const [classDetails, setClassDetails] = useState<Class | null>(null);
    const [classList, setClassList] = useState<Class[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [className, setClassName] = useState("");

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
        const selectedClass = classList.find((classItem) => classItem.id === parseInt(selectedClassId));
        const className = selectedClass ? selectedClass.class_name : '';
        setClassName(className);

        const studentsData = await getStudentsByClassId(selectedClassId);
        setStudents(studentsData);
        // Set the selected student to the first one in the list by default
        setSelectedStudent(studentsData.length > 0 ? studentsData[0].student_name : null);
    };

    return (
        <form
            onSubmit={handleSubmit(async (formData) => {
                if (!selectedStudent) {
                    // You may want to handle this case appropriately, e.g., show an error message.
                    return;
                }

                const invoiceData: InvoiceFormData = {
                    ...formData,
                    studentName: selectedStudent,
                    className: className,
                };

                // Await the asynchronous onSubmit operation
                await onSubmit(invoiceData);

                // Generate and download PDF with a custom filename
                const pdfElement = document.getElementById('pdf-element');
                const pdfOptions = {
                    filename: `invoice - ${selectedStudent}.pdf`,
                };
                html2pdf(pdfElement, pdfOptions);
            })}
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark"
        >
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Invoice Generation</h3>
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
                        }}
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
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
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
                    <label htmlFor="description" className="mb-2.5 block text-black dark:text-white">
                        Description <span className="text-meta-1">*</span>
                    </label>
                    <textarea
                        {...register('description', { required: true })}
                        placeholder="Enter invoice description"
                        rows={4} // Specify the number of rows
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
                <div className="mb-4.5">
                    <label htmlFor="amount" className="mb-2.5 block text-black dark:text-white">
                        Amount <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="text"
                        {...register('amount', { required: true })}
                        placeholder="Enter invoice amount"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    />
                </div>

                <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                    Generate Invoice
                </button>
            </div>
        </form>
    );
};

export default InvoiceForm;

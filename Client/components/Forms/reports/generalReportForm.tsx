import React, { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getStudents } from '@/services/studentService'; // Import the student service
import { Student } from '@/types/student';
import { getStaff } from '@/services/staffService'; // Import the staff service
import { Staff } from '@/types/staff';
import html2pdf from 'html2pdf.js';
import GeneratedReport from './generalReportGenerated';
import ReactDOMServer from 'react-dom/server';

interface GeneralFormData {
    includeStudents: boolean;
    includeStaff: boolean;
}

interface GeneralReportFormProps {
    onSubmit: SubmitHandler<GeneralFormData>;
}

const GeneralReportForm: React.FC<GeneralReportFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm<GeneralFormData>();
    const [students, setStudents] = useState<Student[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    const pdfElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const studentsData = await getStudents();
                setStudents(studentsData);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }

        fetchStudents();
    }, []);

    useEffect(() => {
        async function fetchStaff() {
            try {
                const staffData = await getStaff();
                setStaff(staffData);
            } catch (error) {
                console.error('Error fetching staff:', error);
            }
        }

        fetchStaff();

    }, []);

    const handleGeneratePDF = async (formData: GeneralFormData) => {
        console.log('Form submitted:', formData);

        // Use the form data and additional components (if needed) to construct the HTML
        const pdfContent = (
            <GeneratedReport includeStudents={formData.includeStudents} includeStaff={formData.includeStaff} students={students} staff={staff} />
        );
        console.log('PDF Content:', pdfContent);

        // Convert JSX to HTML
        const htmlContent = ReactDOMServer.renderToStaticMarkup(pdfContent);

        // Create the PDF
        if (pdfElementRef.current) {
            html2pdf(htmlContent, {
                margin: 10,
                filename: 'General Report.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }, // Adjust orientation and format
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleGeneratePDF)}
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark"

        >
            <div ref={pdfElementRef}>

                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">General Report Generation</h3>
                </div>
                {/* Checkbox to include students */}
                <div className="p-6.5">
                    <label htmlFor="className" className="mb-2.5 block text-black dark:text-white">
                        Choose what to include <span className="text-meta-1">*</span>
                    </label>
                    <div className="mb-4.5">
                        <input
                            type="checkbox"
                            id="includeStudents"
                            // name="includeStudents"
                            {...register('includeStudents')}
                            //defaultChecked={!!formData.includeStudents}
                            onChange={() => { }}
                        />
                        <label htmlFor="includeStudents"> Include Students</label>
                    </div>

                    {/* Checkbox to include staff */}
                    <div className="mb-4.5">
                        <input type="checkbox" id="includeStaff"// name="includeStaff"     
                            {...register('includeStaff')}
                            onChange={() => { }}

                        // ref={register} 
                        />
                        <label htmlFor="includeStaff"> Include Staff</label>
                    </div>

                    {/* ... other checkboxes for additional data sections ... */}

                    {/* Submit button */}
                    <button type="submit"
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"

                    >Generate Report</button>
                </div>
            </div>

        </form>
    );
};

export default GeneralReportForm;

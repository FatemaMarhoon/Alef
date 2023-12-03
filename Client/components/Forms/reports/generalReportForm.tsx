import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getStudents } from '@/services/studentService'; // Import the student service
import { Student } from '@/types/student';
import { getStaff } from '@/services/staffService'; // Import the staff service
import { Staff } from '@/types/staff';
interface GeneralFormData {
    includeStudents: boolean;
    includeStaff: boolean;
    // ... other form fields
}

interface GeneralReportFormProps {
    onSubmit: SubmitHandler<TripFormData>;
}

const TripReportForm: React.FC<GeneralReportFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm<GeneralFormData>();
    const [students, setStudents] = useState<Student[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);

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
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* ... existing form fields ... */}

            {/* Checkbox to include students */}
            <div>
                <input
                    type="checkbox"
                    id="includeStudents"
                    name="includeStudents"
                    ref={register}
                />
                <label htmlFor="includeStudents">Include Students</label>
            </div>

            {/* Checkbox to include staff */}
            <div>
                <input type="checkbox" id="includeStaff" name="includeStaff" ref={register} />
                <label htmlFor="includeStaff">Include Staff</label>
            </div>

            {/* ... other checkboxes for additional data sections ... */}

            {/* Submit button */}
            <button type="submit">Generate Report</button>
        </form>
    );
};

export default TripReportForm;

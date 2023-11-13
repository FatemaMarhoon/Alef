'use client'
import React from 'react';
import { useRouter } from 'next/router';
import EditStudentForm from '@/components/Forms/studentForms/editStudentForm'; // Adjust the path based on your project structure
const editPage = ({ params }: { params: { studentId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <EditStudentForm studentId={params.studentId.toString()} />
        </div >
    );
};

export default editPage;
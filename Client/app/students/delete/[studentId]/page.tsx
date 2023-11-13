'use client'
import React from 'react';
import { useRouter } from 'next/router';
import DeleteStudentForm from '@/components/Forms/studentForms/deleteStudentForm'; // Adjust the path based on your project structure
const deletePage = ({ params }: { params: { studentId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <DeleteStudentForm studentId={params.studentId.toString()} />
        </div >
    );
};

export default deletePage;

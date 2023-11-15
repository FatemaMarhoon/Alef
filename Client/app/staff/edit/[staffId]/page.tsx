'use client'
import React from 'react';
import { useRouter } from 'next/router';
import EditForm from '@/components/Forms/staffForms/editStaffForm'; // Adjust the path based on your project structure
const editPage = ({ params }: { params: { staffId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <EditForm staffId={params.staffId.toString()} />
        </div >
    );
};

export default editPage;
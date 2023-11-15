'use client'
import React from 'react';
import { useRouter } from 'next/router';
import DeleteForm from '@/components/Forms/staffForms/deleteStaffForm'; // Adjust the path based on your project structure
const deletePage = ({ params }: { params: { staffId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <DeleteForm staffId={params.staffId.toString()} />
        </div >
    );
};

export default deletePage;

'use client'
import React from 'react';
import { useRouter } from 'next/router';
import ViewStaff from '@/components/Forms/staffForms/viewStaff';
const viewPage = ({ params }: { params: { staffId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <ViewStaff staffId={params.staffId.toString()} />
        </div >
    );
};

export default viewPage;
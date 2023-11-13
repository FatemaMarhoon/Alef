'use client'
import React from 'react';
import { useRouter } from 'next/router';
import ViewStudent from '@/components/Forms/studentForms/viewStudent';
const viewPage = ({ params }: { params: { studentId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <ViewStudent studentId={params.studentId.toString()} />
        </div >
    );
};

export default viewPage;
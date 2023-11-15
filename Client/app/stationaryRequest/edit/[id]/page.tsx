'use client'
import React from 'react';
import { useRouter } from 'next/router';
import EditForm from '@/components/Forms/stationaryReqForms/editStationaryRForms'; // Adjust the path based on your project structure
const editPage = ({ params }: { params: { id: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <EditForm id={params.id.toString()} />
        </div >
    );
};

export default editPage;
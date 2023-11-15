'use client'
import React from 'react';
import { useRouter } from 'next/router';
import DeleteForm from '@/components/Forms/stationaryReqForms/deleteStationaryRForm'; // Adjust the path based on your project structure
const deletePage = ({ params }: { params: { id: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <DeleteForm id={params.id.toString()} />
        </div >
    );
};

export default deletePage;
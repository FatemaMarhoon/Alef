'use client'
import React from 'react';
import { useRouter } from 'next/router';
import EditForm from '@/components/Forms/stationaryForms/editStationaryForms'; // Adjust the path based on your project structure
const editPage = ({ params }: { params: { stationaryId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <EditForm stationaryId={params.stationaryId.toString()} />
        </div >
    );
};

export default editPage;
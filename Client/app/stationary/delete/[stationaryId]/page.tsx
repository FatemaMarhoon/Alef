'use client'
import React from 'react';
import { useRouter } from 'next/router';
import DeleteForm from '@/components/Forms/stationaryForms/deleteStationaryForm'; // Adjust the path based on your project structure
const deletePage = ({ params }: { params: { stationaryId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <DeleteForm stationaryId={params.stationaryId.toString()} />
        </div >
    );
};

export default deletePage;
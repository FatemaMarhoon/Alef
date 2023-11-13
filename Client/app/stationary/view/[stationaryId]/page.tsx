'use client'
import React from 'react';
import { useRouter } from 'next/router';
import ViewPage from '@/components/Forms/stationaryForms/viewStationaryForm';
const viewPage = ({ params }: { params: { stationaryId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <ViewPage stationaryId={params.stationaryId.toString()} />
        </div >
    );
};

export default viewPage;
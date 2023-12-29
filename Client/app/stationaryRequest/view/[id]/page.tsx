'use client'
import React from 'react';
import { useRouter } from 'next/router';
import ViewPage from '@/components/Forms/stationaryReqForms/viewPage';
const viewPage = ({ params }: { params: { id: number } }) => {

    return (
        <div>
            <ViewPage id={params.id.toString()} />
        </div >
    );
};

export default viewPage;
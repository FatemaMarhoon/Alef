'use client'
import React from 'react';
import { useRouter } from 'next/router';
import RequestReviewPage from '@/components/Forms/requestsForms/requestReviewForm';

const reviewPage = ({ params }: { params: { requestId: number } }) => {

    return (
        <div>
            {/* <p>Student ID: {params.studentId}</p> */}
            <RequestReviewPage requestId={params.requestId.toString()} />
        </div >
    );
};

export default reviewPage;



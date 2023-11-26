// Import necessary modules and components
'use client'
import React from 'react';
import CreateForm from '@/components/Forms/createClassForm';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';

interface CreatePageProps {
    numClasses: number;
    grade: string;
}

// Use NextPage type and pass the props directly
const createPage: NextPage<CreatePageProps> = ({ numClasses, grade }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchParams = useSearchParams();
    console.log('Props in CreatePage:', Number(searchParams.get(numClasses)), searchParams.get(grade)); // Check if values are printed here

    return (
        <>
            {/* Pass the parameters to the CreateForm component */}
            <CreateForm numClasses={numClasses} grade={grade} />
        </>
    );
};

export default createPage;

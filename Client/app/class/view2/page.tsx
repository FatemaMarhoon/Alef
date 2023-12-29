// Import necessary modules and components
'use client'
import React, { useState } from 'react';
import CreateForm from '@/components/Forms/createClassForm';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { Class } from '@/types/class';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb2';

interface CreatePageProps {
    numClasses: number;
    grade: string;
}

// Use NextPage type and pass the props directly
const createPage: NextPage<CreatePageProps> = ({ numClasses, grade }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [createdClasses, setCreatedClasses] = useState<Class[]>([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchParams = useSearchParams();
    console.log('Props in CreatePage:', Number(searchParams.get(numClasses)), searchParams.get(grade)); // Check if values are printed here

    const handleCreateClasses = (newClasses: Class[]) => {
        // Handle the created classes or class IDs here
        console.log('Created classes:', newClasses);
        setCreatedClasses(newClasses); // Update state with created classes
    };

    return (
        <>
            {/* Pass the parameters and createdClasses to the CreateForm component */}
            <CreateForm numClasses={numClasses} grade={grade} createdClasses={createdClasses} />
        </>
    );
};

export default createPage;

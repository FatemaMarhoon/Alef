// Import necessary modules and components
'use client'
import React, { useState } from 'react';
import CreateForm from '@/components/Forms/createClassForm';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { Class } from '@/types/class';

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

    const handleCreateClasses = (newClasses: Class[]) => {
        // Handle the created classes or class IDs here
        console.log('Created classes:', newClasses);
        setCreatedClasses(newClasses); // Update state with created classes
    };

    return (
        <>
            {/* Pass the parameters and createdClasses to the CreateForm component */}
            {/* <CreateForm numClasses={numClasses} grade={grade} createdClasses={createdClasses} /> */}
            <CreateForm />

        </>
    );
};

export default createPage;

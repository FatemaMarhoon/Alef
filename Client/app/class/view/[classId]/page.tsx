// Import necessary modules and components
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import ClassDetails from '@/components/Tables/ClassDetails'; // Assuming ClassDetails is the correct component

const viewPage = ({ params }: { params: { classId: number } }) => {

    return (
        <div>
            {/* Render the ClassDetails component with the classId */}
            <ClassDetails classId={params.classId.toString()} />
        </div>
    );
};

export default viewPage;

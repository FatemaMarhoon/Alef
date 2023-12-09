// Import necessary modules and components
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Pages/profile'; // Assuming ClassDetails is the correct component

const profile = ({ params }: { params: { id: number } }) => {

    return (
        <div>
            {/* Render the ClassDetails component with the classId */}
            <Profile id={params.id} />
        </div>
    );
};

export default profile;

// Import necessary modules and components
'use client'
import React from 'react';
import Profile from '@/components/Pages/profile'; // Assuming ClassDetails is the correct component

const profile = ({ params }: { params: { id: string } }) => {

    return (
        <div>
            <Profile id={params.id} />
        </div>
    );
};

export default profile;

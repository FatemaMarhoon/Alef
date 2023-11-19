// // Import necessary modules and components
// 'use client'
// import React from 'react';

// import CreateForm from '@/components/Forms/createClassForm'; // Assuming ClassDetails is the correct component

// const createPage: React.FC = () => {
//     return (
//         <>
//             <CreateForm></CreateForm>
//         </>
//     );
// };

// export default createPage;
// // Import necessary modules and components
'use client'
import React from 'react';
import CreateForm from '@/components/Forms/createClass';

const createPage: React.FC = () => {
    const handleCreateClasses = (newClasses) => {
        // Handle the new classes
        console.log("New classes:", newClasses);
    };

    return (
        <>
            <CreateForm onCreateClasses={handleCreateClasses} />
        </>
    );
};

export default createPage;

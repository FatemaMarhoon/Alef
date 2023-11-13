// // pages/students/delete/[studentId].tsx
// import React from 'react';
// import { useRouter } from 'next/router';
// import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
// import DeleteStudentForm from '@/components/Forms/DeleteStudentForm'; // Adjust the path based on your project structure

// const DeletePage = ({ params }: { params: { studentId: string } }) => {
//     const router = useRouter();
//     const { studentId } = router.query;

//     return (
//         <>
//             <Breadcrumb pageName="Delete Student" />
//             <div className="container">
//                 <h1>Delete Student</h1>
//                 {studentId && <DeleteStudentForm studentId={params.studentId} />}
//             </div>
//         </>
//     );
// };

// export default DeletePage;

// pages/students/delete/[studentId].tsx
// import React from 'react';
// import { useRouter } from 'next/router';
// import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
// import DeleteStudentForm from '@/components/Forms/DeleteStudentForm'; // Adjust the path based on your project structure

// const DeletePage = () => {
//     const router = useRouter();
//     const { studentId } = router.query;

//     return (
//         <>
//             <Breadcrumb pageName="Delete Student" />
//             <div className="container">
//                 <h1>Delete Student</h1>
//                 {studentId && <DeleteStudentForm studentId={studentId as string} />}
//             </div>
//         </>
//     );
// };

// export default DeletePage;
//pages/students/delete/[studentId].tsx
'use client'
import React from 'react';
import { useRouter } from 'next/router';
import DeleteStudentForm from '@/components/Forms/deleteStudentForm'; // Adjust the path based on your project structure
const deletePage = ({ params }: { params: { studentId: number } }) => {

    return (
        <div>
            <p>Student ID: {params.studentId}</p>
            <DeleteStudentForm studentId={params.studentId.toString()} />
        </div >
    );
};

export default deletePage;
//'use client'
// pages/students/delete/[studentId].tsx
// import { useRouter } from 'next/router';

// const deletePage = () => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const router = useRouter();
//     console.log('Router query:', router.query); // Check if the query object is present

//     const { studentId } = router.query;
//     console.log('Student ID:', studentId);

//     return (
//         <>
//             <div className="flex justify-center items-center">
//                 <h2>Student id: {studentId}</h2>
//             </div>
//             {/* <RequestForm planId={studentId}></RequestForm> */}
//         </>
//     );
// };

// export default deletePage;


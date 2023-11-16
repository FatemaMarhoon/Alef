// // ClassDetails.tsx
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getClasses } from '../../services/classService'; // Import the service function for getting class details
// import { Student } from '../../types/student';

// interface ClassDetailsProps {
//     // Add any additional props if needed
// }

// const ClassDetails: React.FC<ClassDetailsProps> = (props) => {
//     const router = useRouter();
//     const { preschool_id } = router.query; // Assuming the route parameter is preschool_id, adjust it if needed
//     const [classDetails, setClassDetails] = useState<any>({}); // Adjust the type as per your class data structure
//     const [students, setStudents] = useState<Student[]>([]);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 // Fetch class details
//                 const classDetailsData = await getClassDetails(preschool_id as string); // Adjust the service function accordingly
//                 setClassDetails(classDetailsData);

//                 // Fetch students for the class
//                 // Assuming you have a service function getStudentsByClassId, adjust it as needed
//                 // const studentsData = await getStudentsByClassId(classDetailsData.id);
//                 // setStudents(studentsData);
//             } catch (error) {
//                 console.error('Error fetching class details:', error);
//             }
//         }

//         if (preschool_id) {
//             fetchData();
//         }
//     }, [preschool_id]);

//     return (
//         <div>
//             <h2>Class Details</h2>
//             {/* Display class details */}
//             <div>
//                 <p>Class Name: {classDetails.class_name}</p>
//                 {/* Add more details as needed */}
//             </div>

//             <h2>Students</h2>
//             {/* Display the table of students */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Student ID</th>
//                         <th>Student Name</th>
//                         {/* Add more headers as needed */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((student) => (
//                         <tr key={student.id}>
//                             <td>{student.id}</td>
//                             <td>{student.student_name}</td>
//                             {/* Add more columns as needed */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ClassDetails;

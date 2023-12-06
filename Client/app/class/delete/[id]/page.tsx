// 'use client'
// import React, { useState, useEffect } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { getClassById, deleteClass } from "@/services/classService";
// import { useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation'
// import { Class } from "@/types/class";
// import { useSuccessMessageContext } from '@/components/SuccessMessageContext';

// export default function DeleteStudentPage({ params }: { params: { id: number } }) {
//     const router = useRouter();
//     const { setSuccessMessage } = useSuccessMessageContext();
//     const [errors, setErrors] = useState<{ [key: string]: string }>({});
//     const [class, setClass]= useState<Class | null>(null);
   
//     useEffect(() => {
//         console.log("Class ID:", params.id);

//         async function fetchClass() {
//             try {
//                 if (params.id) {
//                     const classData = await getClassById(params.id.toString());
//                     setClass(classData);
//                 }
//             } catch (error) {
//                 console.error("Error fetching class:", error);
//             }
//         }

//         // Check if studentId is available before calling fetchStudent
//         if (params.id) {
//             fetchClass();
//         }
//     }, [params.id]);

//     const handleDelete = async () => {
//         console.log("Before confirmation");
//         const confirmDelete = window.confirm("Are you sure you want to delete this class?");
//         console.log("After confirmation", confirmDelete);

//         if (confirmDelete && params.id) {
//             try {
//                 const response = await deleteClass(params.id.toString());
//                 console.log(response.data);

//                 const successMsg = response.data.message;
//                 if (response.status === 200 || response.status === 201) {
//                     setSuccessMessage(successMsg);
//                 }

//                 console.log("Class deleted successfully");
//                 router.push("/class");
//             } catch (error) {
//                 console.error("Error deleting student:", error);
//             }
//         }
//     };


//     return (
//         <>
//             <Breadcrumb pageName="Delete Class" />

//             <div className="items-center justify-center min-h-screen">
//                 <div className="flex flex-col gap-9">
//                     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                         <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//                             <h3 className="font-medium text-black dark:text-white">Delete Class</h3>
//                         </div>
//                         <div className="p-6.5">
//                             {class ? (
//                                 <>
//                                     <p>
//                                         <strong>Student Name:</strong> {cl.student_name}
//                                     </p>
//                                     <p>
//                                         <strong>Date of Birth:</strong> {new Date(student.DOB).toLocaleDateString()}
//                                     </p>
//                                     <p>
//                                         <strong>CPR:</strong> {student.CPR}
//                                     </p>
//                                     <p>
//                                         <strong>Contact Number 1:</strong> {student.contact_number1}
//                                     </p>
//                                     <p>
//                                         <strong>Contact Number 1:</strong> {student.contact_number2}
//                                     </p>
//                                     <p>
//                                         <strong>Guardian Name:</strong> {student.guardian_name}
//                                     </p>
//                                     <p>
//                                         <strong>Enrollment Date:</strong> {new Date(student.enrollment_date).toLocaleDateString()}
//                                     </p>
//                                     <p>
//                                         <strong>Medical History:</strong> {student.medical_history}
//                                     </p>
//                                     {/* Display other student information using <p> or <h> tags */}
//                                 </>
//                             ) : (
//                                 <p>Loading student information...</p>
//                             )}

//                             <div className="mt-6">
//                                 <button
//                                     type="button"
//                                     onClick={handleDelete}
//                                     className="flex justify-center items-center rounded bg-danger p-3 font-medium text-white"
//                                 >
//                                     Delete Student
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

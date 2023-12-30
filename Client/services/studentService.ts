import { Student } from '@/types/student'; // Import the Student type
//import { currentUser } from './userService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { currentPreschool, currentToken, currentUser } from './authService';

const BASE_URL = `http://localhost:3000/student`; // Backend URL for students
//const BASE_URL = 'https://server-bckggkpqeq-uc.a.run.app/student' // Backend URL for students

export async function getStudents(grade?: string): Promise<Student[]> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        let url = `${BASE_URL}/preschool/${preschool}`;

        // Append the grade parameter to the URL if provided
        if (grade) {
            url += `/grade/${grade}`; // Use /{grade} to match your server route
            console.log(url);
        }

        const response = await axios.get<Student[]>(url, config);

        return response.data;
    } catch (error) {
        console.error("Error getting students:", error);
        // Handle the error as needed
        throw error;
    }
}


export async function getStudentById(studentId: string | null): Promise<Student> {
    console.log("Fetching student with id:", studentId); // Add this line
    try {
        const response = await axios.get<Student>(`${BASE_URL}/${studentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function createStudent(
    preschool_id: number,
    student_name: string,
    grade: string,
    DOB: Date,
    CPR: number,
    contact_number1: number,
    contact_number2: number,
    guardian_name: string,
    enrollment_date: Date,
    medical_history: string,
    gender: string,
    personal_picture: File | undefined,
    certificate_of_birth: File | undefined,
    passport: File | undefined
): Promise<any> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'multipart/form-data', // Make sure to set the content type

            },
        };

        const response = await axios.post<Student>(BASE_URL,
            {
                preschool_id: preschool,
                // class_id: class_id,
                student_name: student_name,
                grade: grade,
                DOB: DOB,
                CPR: CPR,
                contact_number1: contact_number1,
                contact_number2: contact_number2,
                guardian_name: guardian_name,
                enrollment_date: enrollment_date,
                medical_history: medical_history,
                gender: gender,
                personal_picture: personal_picture,
                certificate_of_birth: certificate_of_birth,
                passport: passport
            }
            , config);
        return response;
    } catch (error) {
        console.error("Error creating student:", error);
        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", axiosError.response.data);
            console.error("Response status:", axiosError.response.status);
            console.error("Response headers:", axiosError.response.headers);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error("No response received:", axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", axiosError.message);
        }

        throw axiosError;
    }
}
export async function deleteStudent(studentId: string): Promise<any> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        // Make the DELETE request to the API
        const response = await axios.delete(`${BASE_URL}/${studentId}`, config);
        return response;
    } catch (error) {
        console.error("Error deleting student:", error);
        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", axiosError.response.data);
            console.error("Response status:", axiosError.response.status);
            console.error("Response headers:", axiosError.response.headers);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error("No response received:", axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", axiosError.message);
        }

        throw axiosError;
    }
}
// export async function updateStudent(studentId: string, studentData: Student): Promise<any> {
//     try {
//         var token; var preschool;
//         await currentToken().then((returnedTOken) => { token = returnedTOken; })
//         await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
//         // Set up the request config with headers
//         const config: AxiosRequestConfig = {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//                 'Content-Type': 'multipart/form-data', // Make sure to set the content type

//             },
//         };

//         // Make the PUT request to update the student
//         const response = await axios.put(`${BASE_URL}/${studentId}`, studentData, config);

//         // Handle the successful response here, if needed
//         console.log('Student updated successfully', response.data);
//         return response;
//         //return response;
//     } catch (error) {
//         console.error("Error updating student:", error);
//         // Type assertion for error variable
//         const axiosError = error as AxiosError;

//         // Print Axios error details
//         if (axiosError.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.error("Response data:", axiosError.response.data);
//             console.error("Response status:", axiosError.response.status);
//             console.error("Response headers:", axiosError.response.headers);
//         } else if (axiosError.request) {
//             // The request was made but no response was received
//             console.error("No response received:", axiosError.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.error("Error setting up the request:", axiosError.message);
//         }

//         throw axiosError;
//     }


// }
export async function updateStudent(
    studentId: string,
    studentAttributes: Partial<Student>
): Promise<any> {
    try {
        let token;
        let preschool;

        await currentToken().then((returnedToken) => {
            token = returnedToken;
        });

        await currentPreschool().then((preschoolId) => {
            preschool = preschoolId;
        });

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'multipart/form-data', // Make sure to set the content type
            },
        };

        const updatedData = {
            student_name: studentAttributes.student_name,
            DOB: studentAttributes.DOB ? new Date(studentAttributes.DOB) : undefined,
            CPR: studentAttributes.CPR,
            contact_number1: studentAttributes.contact_number1,
            contact_number2: studentAttributes.contact_number2,
            guardian_name: studentAttributes.guardian_name,
            enrollment_date: studentAttributes.enrollment_date
                ? new Date(studentAttributes.enrollment_date)
                : undefined,
            class_id: studentAttributes.class_id,
            gender: studentAttributes.gender,
            grade: studentAttributes.grade,
            medical_history: studentAttributes.medical_history,
            passport: studentAttributes.passportFile,
            personal_picture: studentAttributes.personal_pictureFile,
            certificate_of_birth: studentAttributes.certificate_of_birthFile
        };

        console.log(updatedData);

        // Make the PUT request to update the student
        const response = await axios.put(
            `${BASE_URL}/${studentId}`,
            updatedData,
            config
        );

        // Handle the successful response here, if needed
        console.log('Student updated successfully', response.data);
        return response;
    } catch (error) {
        console.error('Error updating student:', error);

        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', axiosError.response.data);
            console.error('Response status:', axiosError.response.status);
            console.error('Response headers:', axiosError.response.headers);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error('No response received:', axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', axiosError.message);
        }

        throw axiosError;
    }
}

export async function getStudentsByClassId(classId: string): Promise<Student[]> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };
        const response = await axios.get<Student[]>(`${BASE_URL}/${preschool}/${classId}`, config);
        return response.data;
    } catch (error) {
        console.error("Error updating student:", error);
        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", axiosError.response.data);
            console.error("Response status:", axiosError.response.status);
            console.error("Response headers:", axiosError.response.headers);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error("No response received:", axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", axiosError.message);
        }

        throw axiosError;
    }
}
export async function updateStudentClassId(studentId: string, classId: number): Promise<any> {
    try {
        let token;
        let preschool;

        await currentToken().then((returnedToken) => {
            token = returnedToken;
        });

        await currentPreschool().then((preschoolId) => {
            preschool = preschoolId;
        });

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        };

        // Construct the data payload with only the class_id to be updated
        const studentData: Partial<Student> = {
            class_id: classId,
        };

        // Make the PUT request to update the class_id of the student
        const response = await axios.put(
            `${BASE_URL}/${studentId}`,
            studentData,
            config
        );
        return response;

    } catch (error) {
        console.error('Error updating student class_id:', error);

        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', axiosError.response.data);
            console.error('Response status:', axiosError.response.status);
            console.error('Response headers:', axiosError.response.headers);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error('No response received:', axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', axiosError.message);
        }

        throw axiosError;
    }
}

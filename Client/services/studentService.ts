import { Student } from '@/types/student'; // Import the Student type
//import { currentUser } from './userService';
import { UserStorage } from "@/types/user";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const currentUser = UserStorage.getCurrentUser();
// const BASE_URL = `http://localhost:3000/student/preschool/${currentUser?.preschool_id}`; // Backend URL for students
const BASE_URL = 'http://localhost:3000/student' // Backend URL for students

// export async function getStudents(): Promise<Student[]> {
//     try {
//         const token = localStorage.getItem('token'); // Get the JWT token from localStorage

//         // Set up the request config with headers
//         const config: AxiosRequestConfig = {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//             },
//         };

//         //  const response = await axios.get<Student[]>(BASE_URL, config);
//         // const response = await axios.get<Student[]>(BASE_URL, config);
//         const response = await axios.get<Student[]>(`${BASE_URL}/preschool/${currentUser?.preschool_id}`);

//         return response.data;
//     } catch (error) {
//         console.error("Error deleting student:", error);
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

export async function getStudents(grade?: string): Promise<Student[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        let url = `${BASE_URL}/preschool/${currentUser?.preschool_id}`;

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
export async function createStudent(student: Student): Promise<Student> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'multipart/form-data', // Make sure to set the content type

            },
        };

        const response = await axios.post<Student>(BASE_URL, student, config);
        return response.data;
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
export async function deleteStudent(studentId: string): Promise<void> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        }; console.log("Deleting student...");


        // Make the DELETE request to the API
        await axios.delete(`${BASE_URL}/${studentId}`, config);
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
export async function updateStudent(studentId: string, studentData: Student): Promise<void> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        // Make the PUT request to update the student
        const response = await axios.put(`${BASE_URL}/${studentId}`, studentData, config);

        // Handle the successful response here, if needed
        console.log('Student updated successfully', response.data);
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

export async function getStudentsByClassId(classId: string): Promise<Student[]> {
    try {
        const response = await axios.get<Student[]>(`${BASE_URL}/${currentUser?.preschool_id}/${classId}`);
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

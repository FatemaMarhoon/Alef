import { Student } from '@/types/student'; // Import the Student type
import axios, { AxiosRequestConfig } from 'axios';
//import { currentUser } from './userService';
import { UserStorage } from "@/types/user";
const currentUser = UserStorage.getCurrentUser();
const BASE_URL = `http://localhost:3000/student/preschool/${currentUser?.preschool_id}`; // Backend URL for students

export async function getStudents(): Promise<Student[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        //  const response = await axios.get<Student[]>(BASE_URL, config);
        const response = await axios.get<Student[]>(BASE_URL, config);
        return response.data;
    } catch (error) {
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
            },
        };

        const response = await axios.post<Student>(BASE_URL, student, config);
        return response.data;
    } catch (error) {
        throw error;
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


        // You can also access specific properties of the error, for example:
        console.error('Error status code:', error.response.status);
        console.error('Error response data:', error.response.data);
        throw error;
    }
}
export async function updateStudent(studentId: string, studentData): Promise<void> {
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
        // Log the Axios error details
        console.error('Error updating student:', error);

        // You can also access specific properties of the error, for example:
        console.error('Error status code:', error.response.status);
        console.error('Error response data:', error.response.data);

        throw error; // Rethrow the error to propagate it to the calling code
    }
}

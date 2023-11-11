import { Student } from '@/types/Student'; // Import the Student type
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000/students'; // Backend URL for students

export async function getStudents(): Promise<Student[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Student[]>(BASE_URL, config);
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

// Add more student-related functions as needed (e.g., updateStudent, deleteStudent)

import { GradeCapacity } from '@/types/gradeCapacity'
import { currentUser } from './userService';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/grades'; // Replace with your backend URL

export async function getGrades(): Promise<GradeCapacity[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        // const response = await axios.get<GradeCapacity[]>(`${BASE_URL}?preschool=${currentUser()?.preschool_id}`);
        const response = await axios.get<GradeCapacity[]>(`${BASE_URL}?preschool=1`);

        return response.data;
    } catch (error) {
        throw error;
    }
}

import { GradeCapacity } from '@/types/gradeCapacity'
import { UserStorage } from "@/types/user";
const currentUser = UserStorage.getCurrentUser();
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { currentToken, currentPreschool } from './authService';

const BASE_URL = 'http://localhost:3000/grades'; 

export async function getGrades(): Promise<GradeCapacity[]> {
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

        const response = await axios.get<GradeCapacity[]>(`${BASE_URL}?preschool=${preschool}`);

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getGradeCapacityById(gradeId: string): Promise<GradeCapacity> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<GradeCapacity>(`${BASE_URL}/${currentUser?.preschool_id}/${gradeId}`, config);

        return response.data;
    } catch (error) {
        throw error;
    }
}

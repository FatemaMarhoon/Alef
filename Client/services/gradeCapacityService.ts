import { GradeCapacity } from '@/types/gradeCapacity'
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

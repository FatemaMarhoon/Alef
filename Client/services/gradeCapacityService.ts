import { GradeCapacity } from '@/types/gradeCapacity'
import { UserStorage } from "@/types/user";
const currentUser = UserStorage.getCurrentUser();
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { currentToken, currentPreschool } from './authService';

const BASE_URL = 'https://server-bckggkpqeq-uc.a.run.app/grades';

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

        const response = await axios.get<GradeCapacity[]>(`${BASE_URL}?preschool=${preschool}`, config);

        return response.data;
    } catch (error) {
        console.error("Error getting grades:", error);
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


export async function getGradeCapacityById(gradeId: string): Promise<GradeCapacity> {
    try {
        var token;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
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

export async function updateGradesCapacity(gradesList:{grade:string, capacity:string}[], preschool_id:number){
    try {
        var token;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.put(`${BASE_URL}/`, {
            gradesList,
            preschool_id
        }, config);

        return response.data;
    } catch (error) {
        throw error;
    }
}
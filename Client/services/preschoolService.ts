import { Preschool } from '@/types/preschool'; // Import the Preschool type
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/preschools'; // Backend URL for preschools

export async function getPreschools(): Promise<Preschool[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Preschool[]>(BASE_URL, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createPreschool(preschool_name: string, request_id: number, plan_id: number): Promise<Preschool> {
    try {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post<Preschool>(BASE_URL, { preschool_name: preschool_name, request_id: request_id, plan_id: plan_id }, config);
        return response.data;
    } catch (error) {
        console.error("Error updating status:", error);
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

export async function updatePreschool(preschoolId: string, updatedPreschool: Preschool): Promise<Preschool> {
    try {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const url = `${BASE_URL}/${preschoolId}`;
        const response = await axios.put<Preschool>(url, updatedPreschool, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function deletePreschool(preschoolId: string): Promise<void> {
    try {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const url = `${BASE_URL}/${preschoolId}`;
        await axios.delete(url, config);
    } catch (error) {
        throw error;
    }
}
export async function getPreschoolById(preschoolId: string): Promise<Preschool> {
    try {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const url = `${BASE_URL}/${preschoolId}`;
        const response = await axios.get<Preschool>(url, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching preschool by ID:', error);
        throw error;
    }
}
// services/userService.ts
import { Class } from '@/types/class'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { UserStorage } from "@/types/user";
const currentUser = UserStorage.getCurrentUser();
const BASE_URL = 'http://localhost:3000/class'

export async function getClasses(): Promise<Class[]> {
    try {
        const response = await axios.get<Class[]>(`${BASE_URL}/preschool/${currentUser?.preschool_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
// Function to get a single class by ID
export async function getClassById(classId: string): Promise<Class> {
    try {
        const response = await axios.get<Class>(`${BASE_URL}/${classId}`);
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

// Function to create a new class
export async function createClass(newClass: Class): Promise<Class> {
    try {
        const response = await axios.post<Class>(BASE_URL, newClass);
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


// Function to update a class by ID
export async function updateClass(classId: string, updatedClass: Class): Promise<Class> {
    try {
        const response = await axios.put<Class>(`${BASE_URL}/${classId}`, updatedClass);
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

// Function to delete a class by ID
export async function deleteClass(classId: string): Promise<void> {
    try {
        await axios.delete(`${BASE_URL}/${classId}`);
    } catch (error) {
        throw error;
    }
}
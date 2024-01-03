// services/userService.ts
import { Request } from '@/types/request'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { currentToken } from './authService';

const BASE_URL = 'https://server-bckggkpqeq-uc.a.run.app/requests'; // Replace with your backend URL
//const BASE_URL = 'http://localhost:3001/requests'

export async function createRequest(preschool_name: string,
    representitive_name: string,
    CR: string,
    phone: string,
    email: string, plan_id: number) {
    try {
        var token;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.post(`${BASE_URL}`, {
            preschool_name: preschool_name,
            representitive_name: representitive_name,
            CR: CR,
            phone: phone,
            email: email,
            plan_id: plan_id
        }, config);
        return response;
    } catch (error) {
        console.log(error);
        const axiosError = error as AxiosError;
        throw axiosError;
    }
}
export async function getRequests(): Promise<Request[]> {
    try {

        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Request[]>(BASE_URL, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getRequestById(requestId: string): Promise<Request> {
    try {

        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Request>(`${BASE_URL}/${requestId}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateRequestStatus(requestId: string, newStatus: string): Promise<any> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.patch<Request>(
            `${BASE_URL}/${requestId}`,
            { status: newStatus },
            config
        );
        return response;
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

export async function deleteRequest(requestId: string): Promise<void> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        await axios.delete(`${BASE_URL}/${requestId}`, config);
    } catch (error) {
        throw error;
    }
}
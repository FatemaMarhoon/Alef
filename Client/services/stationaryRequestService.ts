import { StationaryRequest } from '@/types/stationaryRequest'; // Import the Stationary_Request type
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { currentPreschool, currentToken } from './authService';

const BASE_URL = 'https://server-bckggkpqeq-uc.a.run.app/stationaryRequest'; // Backend URL for stationary requests

export async function getStationaryRequests(): Promise<StationaryRequest[]> {
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

        const response = await axios.get<StationaryRequest[]>((`${BASE_URL}/preschool/${preschool}`), config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createStationaryRequest(request: StationaryRequest): Promise<any> {
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

        const response = await axios.post<StationaryRequest>(BASE_URL, request, config);
        return response;
    } catch (error) {
        console.error("Error :", error);
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

export async function updateStationaryRequest(id: string, updatedRequest: StationaryRequest): Promise<any> {
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
        const url = `${BASE_URL}/${id}`;
        const response = await axios.put<StationaryRequest>(url, updatedRequest, config);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteStationaryRequest(id: string): Promise<any> {
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
        const url = `${BASE_URL}/${id}`;
        const response = await axios.delete(url, config);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getStationaryRequestById(id: string): Promise<StationaryRequest> {
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
        const response = await axios.get<StationaryRequest>(`${BASE_URL}/${id}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
import { StationaryRequest } from '@/types/stationaryRequest'; // Import the Stationary_Request type
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000/stationaryRequest'; // Backend URL for stationary requests

export async function getStationaryRequests(): Promise<StationaryRequest[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<StationaryRequest[]>(BASE_URL, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createStationaryRequest(request: StationaryRequest): Promise<StationaryRequest> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.post<StationaryRequest>(BASE_URL, request, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateStationaryRequest(id: string, updatedRequest: StationaryRequest): Promise<StationaryRequest> {
    try {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const url = `${BASE_URL}/${id}`;
        const response = await axios.put<StationaryRequest>(url, updatedRequest, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteStationaryRequest(id: string): Promise<void> {
    try {
        const token = localStorage.getItem('token');
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const url = `${BASE_URL}/${id}`;
        await axios.delete(url, config);
    } catch (error) {
        throw error;
    }
}

export async function getStationaryRequestById(id: string): Promise<StationaryRequest> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

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
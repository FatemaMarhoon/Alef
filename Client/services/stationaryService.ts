import { Stationary } from '@/types/stationary'; // Import the Stationary type

import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000/Stationary'; // backend URL

export async function getStationary(): Promise<Stationary[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Stationary[]>(BASE_URL, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createStationary(stationaryData: Stationary): Promise<void> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found. User may not be authenticated.');
        }

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        };

        await axios.post(BASE_URL, stationaryData, config);
    } catch (error) {
        throw error;
    }
}
export async function updateStationary(stationaryId: string, stationaryData: Stationary): Promise<void> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found. User may not be authenticated.');
        }

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        };

        await axios.put(`${BASE_URL}/${stationaryId}`, stationaryData, config);
    } catch (error) {
        throw error;
    }
}

export async function getStationaryById(stationaryId: string): Promise<Stationary> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found. User may not be authenticated.');
        }

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get<Stationary>(`${BASE_URL}/${stationaryId}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function deleteStationary(stationaryId: string): Promise<void> {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found. User may not be authenticated.');
        }

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.delete(`${BASE_URL}/${stationaryId}`, config);
    } catch (error) {
        throw error;
    }
}
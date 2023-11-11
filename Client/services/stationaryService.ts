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

// Add more stationary-related functions as needed

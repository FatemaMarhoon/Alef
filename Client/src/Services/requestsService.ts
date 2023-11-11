import { Request } from '@/types/Request'; // Import the Request type
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000/requests'; // Backend URL for requests

export async function getRequests(): Promise<Request[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

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

// You can add more request-related functions as needed (e.g., create, update, delete)

import { Staff } from '@/types/staff'; // Import the Staff type
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000/staff'; // Backend URL for staff

export async function getStaff(): Promise<Staff[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Staff[]>(BASE_URL, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createStaff(staff: Staff): Promise<Staff> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.post<Staff>(BASE_URL, staff, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// You can add more staff-related functions as needed (e.g., updateStaff, deleteStaff)
import { Staff } from '@/types/staff'; // Import the Staff type
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { UserStorage } from "@/types/user";
const currentUser = UserStorage.getCurrentUser();
const BASE_URL = 'http://localhost:3000/staff';
// Backend URL for staff

export async function getStaff(): Promise<Staff[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Staff[]>(`${BASE_URL}/preschool/${currentUser?.preschool_id}`);
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
                Authorization: `Bearer ${token} `, // Include the token in the Authorization header
            },
        };

        const response = await axios.post<Staff>(BASE_URL, staff, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateStaff(staffId: number, updatedStaff: Staff): Promise<Staff> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token} `, // Include the token in the Authorization header
            },
        };

        const response = await axios.put<Staff>(`${BASE_URL} /${staffId}`, updatedStaff, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteStaff(staffId: number): Promise<void> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        await axios.delete(`${BASE_URL}/${staffId}`, config);
    } catch (error) {
        throw error;
    }
}

export async function getStaffById(staffId: number): Promise<Staff> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Staff>(`${BASE_URL}/${staffId}`, config);
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

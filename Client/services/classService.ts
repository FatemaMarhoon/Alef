// services/userService.ts
import { Class } from '@/types/class'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserStorage } from "@/types/user";
const currentUser = UserStorage.getCurrentUser();
const BASE_URL = `http://localhost:3000/class/preschool/${currentUser?.preschool_id}`;

export async function getClasses(): Promise<Class[]> {
    try {
        const response = await axios.get<Class[]>(`${BASE_URL}`);
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
        throw error;
    }
}

// Function to create a new class
export async function createClass(newClass: Class): Promise<Class> {
    try {
        const response = await axios.post<Class>(BASE_URL, newClass);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to update a class by ID
export async function updateClass(classId: string, updatedClass: Class): Promise<Class> {
    try {
        const response = await axios.put<Class>(`${BASE_URL}/${classId}`, updatedClass);
        return response.data;
    } catch (error) {
        throw error;
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
import { Stationary } from '@/types/stationary'; // Import the Stationary type
import { currentPreschool, currentToken } from './authService';
import axios, { AxiosRequestConfig } from 'axios';
import { resolve } from 'path';

const BASE_URL = 'https://server-bckggkpqeq-uc.a.run.app/Stationary'; // backend URL

export async function getStationary(): Promise<Stationary[]> {
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


        const response = await axios.get<Stationary[]>((`${BASE_URL}/preschool/${preschool}`), config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createStationary(stationaryData: Stationary): Promise<any> {
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


        const response = await axios.post(BASE_URL, stationaryData, config);
        return response;
    } catch (error) {
        throw error;
    }
}
export async function updateStationary(stationaryId: string, stationaryData: Stationary): Promise<any> {
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


        const response = await axios.put(`${BASE_URL}/${stationaryId}`, stationaryData, config);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getStationaryById(stationaryId: string): Promise<Stationary> {
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


        const response = await axios.get<Stationary>(`${BASE_URL}/${stationaryId}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function deleteStationary(stationaryId: string): Promise<any> {
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


        const response = await axios.delete(`${BASE_URL}/${stationaryId}`, config);
        return response;
    } catch (error) {
        throw error;
    }
}
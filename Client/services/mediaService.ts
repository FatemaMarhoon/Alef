import { currentPreschool, currentToken, currentUserId } from './authService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Media } from '@/types/preschool';

const BASE_URL = 'http://localhost:3000/media'; // Replace with your backend URL

export async function getMedia(): Promise<Media[]> {
    //retrieve data from current user
    var token; var preschool;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })
    await currentPreschool().then((preschoolId) => { preschool = preschoolId; })

    try {
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Media[]>(`${BASE_URL}?preschool_id=${preschool}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getMediaById(id: number): Promise<Media> {
    //retrieve data from current user
    var token;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })
    try {
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Media>(`${BASE_URL}/${id}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function uploadMedia(files: File[]) {
    console.log("Upload service recieve: ", files)
    var token; var preschool;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })
    await currentPreschool().then((preschoolId) => { preschool = preschoolId; })

    try {
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'multipart/form-data', // Make sure to set the content type
            },
        };
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append('files', file);
        });

        // Append the preschool_id to the FormData
        formData.append('preschool_id', preschool ? String(preschool) : "");
        const response = await axios.post(`${BASE_URL}`, formData, config);
        return response;
    } catch (error) {
        // Type assertion for error variable
        const axiosError = error as AxiosError;
        throw axiosError;
    }
}

export async function deleteMultipleMedia(ids: number[]) {
    //retrieve data from current user
    var token;
    await currentToken().then((returnedTOken) => { token = returnedTOken; });
    try {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.put(`${BASE_URL}/delete`, {mediaIds:ids}, config);
        return response;
    } catch (error) {
        throw error;
    }
}

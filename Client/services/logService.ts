import { StaticValue } from '@/types/staticValue'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { currentToken } from './authService';
import { Log } from '@/types/log';

const BASE_URL = 'https://server-bckggkpqeq-uc.a.run.app/log'; // Replace with your backend URL

export async function getLogs(): Promise<Log[]> {
    try {
        var token;
        await currentToken().then((returnedToken) => { token = returnedToken; })
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };
        const response = await axios.get<Log[]>(`${BASE_URL}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

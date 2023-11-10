// services/userService.ts
import { Request } from '@/types/request'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/requests'; // Replace with your backend URL

export async function createRequest(preschool_name: string,
    representitive_name: string,
    CR: string,
    phone: string,
    email: string, plan_id: number): Promise<Request> {
    try {
        const response = await axios.post<Request>(`${BASE_URL}`, {
            preschool_name:preschool_name,
            representitive_name:representitive_name,
            CR:CR,
            phone:phone,
            email:email,
            plan_id:plan_id
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

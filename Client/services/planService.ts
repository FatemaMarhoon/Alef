// services/userService.ts
import { Plan } from '@/types/plan'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/plans'; // Replace with your backend URL

export async function getPlans(): Promise<Plan[]> {
  try {
    const response = await axios.get<Plan[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

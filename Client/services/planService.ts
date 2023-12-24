// services/userService.ts
import { Plan } from '@/types/plan'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config(); // Load variables from .env

const BASE_URL = 'https://us-central1-alef-229ac.cloudfunctions.net/app/plans'; // Replace with your backend URL

export async function getPlans(): Promise<Plan[]> {
  try {
    console.log("BASE URL: ",BASE_URL);
    console.log("process.env ",process.env.SERVER_BASE_URL);
    const response = await axios.get<Plan[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

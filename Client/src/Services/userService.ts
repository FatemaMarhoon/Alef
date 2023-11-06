// services/userService.ts
import { User } from '@/types/User';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/users'; // Replace with your backend URL

export async function getUsers(): Promise<User[]> {
  try {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const response = await axios.get<User[]>(`${BASE_URL}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(email: string, password: string) : Promise<any> {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    //if logged in store info in local storage 
    if (response.data.user) {
      localStorage.setItem('token',response.data.jsontoken);
      localStorage.setItem('currentUser',response.data.user);
    }
    return response.data.message;
  } catch (error) {
    throw error;
  }
}
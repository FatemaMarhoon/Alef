// services/userService.ts
import { User } from '@/types/user'
import { currentUser } from './authService';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/users'; // Replace with your backend URL

// function currentUser(): User | null {
//   const userObjectString = localStorage.getItem('currentUser');
//   if (userObjectString) {
//     const userObject = JSON.parse(userObjectString);
//     return userObject;
//   }
//   return null;
// }

export async function getUsers(): Promise<User[]> {
  try {
    const user = await currentUser();
    const token = (await user?.getIdToken())?.toString();
    // Set up the request config with headers
    console.log("in user service: ",token)
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };

    const response = await axios.get<User[]>(`${BASE_URL}?preschool=1`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(email: string, password: string): Promise<any> {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    //if logged in store info in local storage 
    if (response.data.user) {
      localStorage.setItem('token', response.data.jsontoken);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data.message;
  } catch (error) {
    throw error;
  }
}
// services/userService.ts
import { User } from '@/types/user'
import { FirebaseSetup, currentUser } from './authService';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/users'; // Replace with your backend URL

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
    const preschool = user?.getIdTokenResult(true).then((idTokenResult) => {
      const customClaims = idTokenResult.claims;
      return customClaims.preschool_id;
    });
    console.log("preschool id from claims:", preschool)
    const response = await axios.get<User[]>(`${BASE_URL}?${preschool}`, config);
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


export async function createUser(email:string, password:string,name:string,role:string,): Promise<User[]> {
  try {
    const user = await currentUser();
    const token = (await user?.getIdToken())?.toString();
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const preschool = 1
    const response = await axios.post(`${BASE_URL}`, {
      email:email,
      password:password,
      name:name,
      role_name:role,
      preschool_id:preschool
  }, config);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(email:string,disabled:boolean) {
  try {
    const user = await currentUser();
    const token = (await user?.getIdToken())?.toString();
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const response = await axios.put(`${BASE_URL}/${email}`, {
      disabled:disabled
  }, config);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
}
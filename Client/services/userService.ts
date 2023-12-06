// services/userService.ts
import { User } from '@/types/user'
import { currentPreschool, currentToken } from './authService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/users'; // Replace with your backend URL

export async function getUsers(): Promise<User[]> {
  //retrieve data from current user
  var token; var preschool;
  await currentToken().then((returnedTOken) => { token = returnedTOken; })
  await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
  console.log("preschool: ", preschool)
  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };

    const response = await axios.get<User[]>(`${BASE_URL}?preschool=${preschool}`, config);
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

export async function gerUser({ userId, email }: { userId?: number, email?: string }) {
  try {

    var token;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    if (userId) {
      const response = await axios.get(`${BASE_URL}/${userId}`, config);
      return response;
    }
    else if (email) {

    }
  } catch (error) {

  }
}

export async function createUser(email: string, name: string, role: string, preschool: number) {
  //retrieve data from current user
  var token;
  await currentToken().then((returnedTOken) => { token = returnedTOken; })
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const response = await axios.post(`${BASE_URL}`, {
      email: email,
      name: name,
      role_name: role,
      preschool_id: preschool
    }, config);

    return response;

  } catch (error) {
    // Type assertion for error variable
    const axiosError = error as AxiosError;
    throw axiosError;
  }
}


export async function updateUser(userData: { id: number, name?: string, role_name?: string, status?: string }) {
  //retrieve data from current user
  var token;
  await currentToken().then((returnedTOken) => { token = returnedTOken; });
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const response = await axios.put(`${BASE_URL}/${userData.id}`, {
      name: userData.name,
      role_name: userData.role_name,
      status: userData.status
    }, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userid: number) {
  //retrieve data from current user
  var token;
  await currentToken().then((returnedTOken) => { token = returnedTOken; });
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const response = await axios.delete(`${BASE_URL}/${userid}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
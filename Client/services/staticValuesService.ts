import { StaticValue } from '@/types/staticValue'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { currentToken } from './authService';

const BASE_URL = 'http://localhost:3000/staticValues'; // Replace with your backend URL

export async function getRoles(): Promise<StaticValue[]> {
  try {
    var token;
    await currentToken().then((returnedToken) => { token = returnedToken; })
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const response = await axios.get<StaticValue[]>(`${BASE_URL}/roles`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getGuardianTypes(): Promise<StaticValue[]> {
  try {
    var token;
    await currentToken().then((returnedToken) => { token = returnedToken; })
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const response = await axios.get<StaticValue[]>(`${BASE_URL}/guardianTypes`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getGender(): Promise<StaticValue[]> {
  try {
    var token;
    await currentToken().then((returnedToken) => { token = returnedToken; })
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const response = await axios.get<StaticValue[]>(`${BASE_URL}/gender`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getStaffRoles(): Promise<StaticValue[]> {
  try {
    var token;
    await currentToken().then((returnedToken) => { token = returnedToken; })
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const response = await axios.get<StaticValue[]>(`${BASE_URL}/staffRoles`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRequestStatuses(): Promise<StaticValue[]> {
  try {
    var token;
    await currentToken().then((returnedToken) => { token = returnedToken; })
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const response = await axios.get<StaticValue[]>(`${BASE_URL}/requestStatuses`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
import { StaticValue } from '@/types/staticValue'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/staticValues'; // Replace with your backend URL

export async function getRoles(): Promise<StaticValue[]> {
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
      // Set up the request config with headers
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
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
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
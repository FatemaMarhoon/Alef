import { Payment } from '@/types/payment'
import { currentPreschool, currentToken } from './authService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/payments'; // Replace with your backend URL

export async function getPayments(): Promise<Payment[]> {
  //retrieve data from current user
  var token; var preschool;
  await currentToken().then((returnedTOken) => { token = returnedTOken; })
  await currentPreschool().then((preschoolId) => { preschool = preschoolId; })

  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };

    const response = await axios.get(`${BASE_URL}?preschool_id=${preschool}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
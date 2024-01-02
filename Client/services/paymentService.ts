import { Payment } from '@/types/payment'
import { currentPreschool, currentToken } from './authService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'https://server-bckggkpqeq-uc.a.run.app/payments'; // Replace with your backend URL
// const BASE_URL = 'http://localhost:3001/payments'
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


export async function getPaymentById(id: number): Promise<Payment> {
  //retrieve data from current user
  var token;
  await currentToken().then((returnedTOken) => { token = returnedTOken; })
  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };

    const response = await axios.get(`${BASE_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createPayment(fees:number, type:string, student_id:number, due_date:Date, notes:string) {
  var token;  
  await currentToken().then((returnedTOken) => { token = returnedTOken; })

  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };
    
    const response = await axios.post(`${BASE_URL}`, {
      fees:fees,
      student_id:student_id,
      type:type,
      due_date:due_date,
      notes:notes,
    }, config);
    return response;
  } catch (error) {
     // Type assertion for error variable
     const axiosError = error as AxiosError;
     throw axiosError;
  }
}

export async function updatePayment(paymentRecord:Payment) {
  var token;  
  await currentToken().then((returnedTOken) => { token = returnedTOken; })

  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };
    
    const response = await axios.put(`${BASE_URL}/${paymentRecord.id}`, {
    id:paymentRecord.id,
    fees:paymentRecord.fees,
    type:paymentRecord.type,
    due_date:paymentRecord.due_date,
    status:paymentRecord.status,
    student_id:paymentRecord.student_id,
    notes:paymentRecord.notes,
    paid_on:paymentRecord.paid_on
    }, config);
    return response;
  } catch (error) {
     // Type assertion for error variable
     const axiosError = error as AxiosError;
     throw axiosError;
  }
}

export async function remindParent(id: number) {
  //retrieve data from current user
  var token;
  await currentToken().then((returnedTOken) => { token = returnedTOken; })
  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };

    const response = await axios.get(`${BASE_URL}/remind/${id}`, config);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deletePayment(id: number) {
  //retrieve data from current user
  var token;
  await currentToken().then((returnedTOken) => { token = returnedTOken; });
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const response = await axios.delete(`${BASE_URL}/${id}`, config);
    return response;
  } catch (error) {
    throw error;
  }
}
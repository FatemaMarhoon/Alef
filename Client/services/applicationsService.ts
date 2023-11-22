// services/userService.ts
import { Application } from '@/types/application';
import { currentUser } from './userService';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApplicationPOST } from '@/types/applicationPOST';

const BASE_URL = 'http://localhost:3000/applications'; // Replace with your backend URL

export async function getApplications(): Promise<Application[]> {
  try {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    
    const response = await axios.get<Application[]>(`${BASE_URL}?preschool=${currentUser()?.preschool_id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getApplicationById(id: number): Promise<Application> {
  try {
    console.log("id in service function: ", id)
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const response = await axios.get<Application>(`${BASE_URL}/${id}`, config);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createApplication(
  email: string,
  guardian_type: string,
  student_name: string,
  student_CPR: number,
  gender: string,
  grade: string,
  guardian_name: string,
  phone: string,
  student_DOB: Date,
  medical_history: string,
  personal_picture: File | undefined,
  // certificate_of_birth:string,
  // passport:string
  certificate_of_birth: File | undefined,
  passport: File | undefined
): Promise<Application> {
  try {
    console.log(personal_picture)
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'multipart/form-data', // Make sure to set the content type

      },
    };

    // const preschool = currentUser()?.preschool_id?.toString()
    // const createdBy = currentUser()?.id
    const preschool = 1;
    const createdBy = 4;
    const status = "Pending";

    const response = await axios.post(`${BASE_URL}`, {
      email: email,
      student_name: student_name,
      student_CPR: student_CPR,
      student_DOB: student_DOB,
      phone: phone,
      gender: gender,
      grade: grade,
      guardian_name: guardian_name,
      guardian_type: guardian_type,
      medical_history: medical_history,
      personal_picture: personal_picture,
      certificate_of_birth: certificate_of_birth,
      passport: passport,
      status: status,
      created_by: createdBy,
      preschool_id: preschool
    }, config);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function updateApplication(id:number,
  email?: string,
  guardian_type?: string,
  student_name?: string,
  student_CPR?: number,
  gender?: string,
  grade?: string,
  guardian_name?: string,
  phone?: string,
  student_DOB?: Date,
  medical_history?: string,
  personal_picture?: File | undefined,
  // certificate_of_birth:string,
  // passport:string
  certificate_of_birth?: File | undefined,
  passport?: File | undefined,
  status?:string
  ): Promise<Application[]> {
  try {

    console.log(student_DOB)

    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'multipart/form-data', // Make sure to set the content type
      },
    };

     // const preschool = currentUser()?.preschool_id?.toString()
    const preschool = 1;

    const response = await axios.put(`${BASE_URL}/${id}`, {
      email: email,
      student_name: student_name,
      student_CPR: student_CPR,
      student_DOB: student_DOB ? new Date(student_DOB) : undefined,
      phone: phone,
      gender: gender,
      grade: grade,
      guardian_name: guardian_name,
      guardian_type: guardian_type,
      medical_history: medical_history,
      personal_picture: personal_picture,
      certificate_of_birth: certificate_of_birth,
      passport: passport,
      status: status,
      preschool_id: preschool,
  }, config);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}


export async function updateStatus(id:number,
  status:string
  ): Promise<Application[]> {
  try {

    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const response = await axios.put(`${BASE_URL}/${id}`, {
      status:status
  }, config);
    return response.data; 
  } catch (error) {
    console.log(error)
    throw error;
  }
}
// services/userService.ts
import { Application } from '@/types/application';
import { ApplicationPOST } from "@/types/applicationPOST";
import { currentPreschool, currentToken, currentUserId } from './authService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

const BASE_URL = 'http://localhost:3000/applications'; // Replace with your backend URL

export async function getApplications(): Promise<any> {
  try {
    var token; var preschool;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })
    await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const response = await axios.get<Application[]>(`${BASE_URL}?preschool=${preschool}`, config);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getApplicationById(id: number): Promise<Application> {
  try {
    var token; var preschool;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })

    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const response = await axios.get<Application>(`${BASE_URL}/${id}`, config);
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
): Promise<any> {
  var token; var preschool; var userId;
  await currentToken().then((returnedTOken) => { token = returnedTOken; })
  await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
  await currentUserId().then((user_id) => { userId = user_id; })

  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'multipart/form-data', // Make sure to set the content type

      },
    };
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
      created_by: userId,
      preschool_id: preschool
    }, config);

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    // Type assertion for error variable
    const axiosError = error as AxiosError;
    throw axiosError;
  }
}

export async function updateApplication(id:number, updatedApplication:ApplicationPOST) {

  try {
    var token;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })

    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'multipart/form-data', // Make sure to set the content type
      },
    };

    const response = await axios.put(`${BASE_URL}/${id}`, {
      email: updatedApplication.email,
      student_name: updatedApplication.student_name,
      student_CPR: updatedApplication.student_CPR,
      student_DOB: updatedApplication.student_DOB ? new Date(updatedApplication.student_DOB) : undefined,
      phone: updatedApplication.phone,
      gender: updatedApplication.gender,
      grade: updatedApplication.grade,
      guardian_name: updatedApplication.guardian_name,
      guardian_type: updatedApplication.guardian_type,
      medical_history: updatedApplication.medical_history,
      personal_picture: updatedApplication.personal_picture,
      certificate_of_birth: updatedApplication.certificate_of_birth,
      passport: updatedApplication.passport,
      status: updatedApplication.status,
    }, config);
    return response;
  } catch (error) {
    console.log(error)
    const axiosError = error as AxiosError;
    throw axiosError;
  }
}


// export async function updateStatus(id: number,
//   status: string
// ): Promise<Application[]> {
//   try {

//     const token = localStorage.getItem('token'); // Get the JWT token from localStorage
//     // Set up the request config with headers
//     const config: AxiosRequestConfig = {
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//       },
//     };

//     const response = await axios.put(`${BASE_URL}/${id}`, {
//       status: status
//     }, config);
//     return response.data;
//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
// }

export async function deleteApplication(id: number) {

  try {
    var token;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'multipart/form-data', // Make sure to set the content type
      },
    };

    const response = await axios.delete(`${BASE_URL}/${id}`, config);
    return response;
  }
  catch (error) {
    throw error;
  }
}
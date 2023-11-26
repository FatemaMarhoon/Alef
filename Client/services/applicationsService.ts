// services/userService.ts
import { Application } from '@/types/application';
import { currentPreschool, currentToken } from './authService';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

const BASE_URL = 'http://localhost:3000/applications'; // Replace with your backend URL

export async function getApplications(): Promise<Application[]> {
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
    return response.data;
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
  var token; var preschool;
  await currentToken().then((returnedTOken) => { token = returnedTOken; })
  await currentPreschool().then((preschoolId) => { preschool = preschoolId; })

  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'multipart/form-data', // Make sure to set the content type

      },
    };
    const created_by = await axios.get("", config)
    const status = "Pending";
    const createdBy = "17"
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

export async function updateApplication({
  id,
  email,
  guardian_type,
  student_name,
  student_CPR,
  gender,
  grade,
  guardian_name,
  phone,
  student_DOB,
  medical_history,
  personal_picture,
  certificate_of_birth,
  passport,
  status
}: {
  id: number;
  email?: string;
  guardian_type?: string;
  student_name?: string;
  student_CPR?: number;
  gender?: string;
  grade?: string;
  guardian_name?: string;
  phone?: string;
  student_DOB?: Date;
  medical_history?: string;
  personal_picture?: File | undefined;
  certificate_of_birth?: File | undefined;
  passport?: File | undefined;
  status?: string;
}): Promise<Application[]> {

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
    }, config);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
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

export async function deleteApplication(id:number) {

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
  catch (error){
    throw error;
  }
}
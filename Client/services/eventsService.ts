import { Event } from '@/types/event'
import { currentPreschool, currentToken, currentUserId } from './authService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Class } from '@/types/class';

const BASE_URL = 'http://localhost:3000/events'; // Replace with your backend URL

export async function getEvents(): Promise<Event[]> {
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
    return response.data.events;
  } catch (error) {
    throw error;
  }
}

export async function getEventById(id: number): Promise<Event> {
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

export async function createEvent(name: string, date: Date, notes: string, notify_parents: boolean, notify_staff: boolean, public_event: boolean, classes?: number[]) {
  var token; var preschool; var userId;
  await currentToken().then((returnedTOken) => { token = returnedTOken; })
  await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
  await currentUserId().then((user_id) => { userId = user_id; })

  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };
    
    const response = await axios.post(`${BASE_URL}`, {
      event_name: name,
      event_date: date,
      notes: notes,
      notify_parents: notify_parents,
      notify_staff: notify_staff,
      public_event: public_event,
      created_by: userId,
      preschool_id: preschool,
      classes:classes
    }, config);
    return response;
  } catch (error) {
     // Type assertion for error variable
     const axiosError = error as AxiosError;
     throw axiosError;
  }
}

export async function deleteEvent(id: number) {
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

export async function editEvent(id:number, name: string, date: Date, notes: string, notify_parents: boolean, notify_staff: boolean, public_event: boolean, classes?: number[]) {
  var token; 
  await currentToken().then((returnedTOken) => { token = returnedTOken; })

  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };
    
    const response = await axios.put(`${BASE_URL}/${id}`, {
      event_name: name,
      event_date: date,
      notes: notes,
      notify_parents: notify_parents,
      notify_staff: notify_staff,
      public_event: public_event,
      classes:classes
    }, config);
    return response;
  } catch (error) {
     // Type assertion for error variable
     const axiosError = error as AxiosError;
     throw axiosError;
  }
}
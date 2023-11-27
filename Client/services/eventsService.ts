import { Event } from '@/types/event'
import { currentPreschool, currentToken } from './authService';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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

    const userID = 17;
    const response = await axios.post<Event>(`${BASE_URL}`, {
      event_name: name,
      event_date: date,
      notes: notes,
      notify_parents: notify_parents,
      notify_staff: notify_staff,
      public_event: public_event,
      created_by: userID,
      preschool_id: preschool,
      classes:classes
    }, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
import { Notification } from '@/types/notification'
import { currentToken, currentUserId } from './authService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/notifications'; // Replace with your backend URL

export async function getNotifications(): Promise<Notification[]> {
  //retrieve data from current user
  var token; var userId;
  await currentToken().then((returnedTOken) => { token = returnedTOken; })
  await currentUserId().then((user_id) => { userId = user_id; })

  try {
    // Set up the request config with headers
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
    };

    const response = await axios.get<Notification[]>(`${BASE_URL}?user_id=${userId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function markAllRead() {
    //retrieve data from current user
    var token; var userId;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })
    await currentUserId().then((user_id) => { userId = user_id; })
  
    try {
      // Set up the request config with headers
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        },
      };
  
      const response = await axios.put(`${BASE_URL}/${userId}`, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
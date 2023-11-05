// services/userService.ts
import { User } from '@/models/User';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(`${BASE_URL}/users`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
}

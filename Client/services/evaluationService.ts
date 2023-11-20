// services/userService.ts
import { Evaluation } from '@/types/evaluation';
import { currentUser } from './userService';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/evaluations'; // Replace with your backend URL

export async function createEvaluation(
    application_id: number,
    color_size_recognition: number,
    belongings_memory: number,
    task_completion: number,
    letter_number_distinction: number,
    stimuli_discrimination: number,
    auditory_memory: number,
    quick_responses: number,
    sustained_attention: number,
    environmental_perception: number,
    quick_comprehension: number,
    math_problem_solving: number,
    quranic_verses_recall: number,
    first_time_attention: number,
    focus_on_significant_stimuli: number,
    total_mark: number
): Promise<Evaluation> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.post(`${BASE_URL}`, {
            color_size_recognition: color_size_recognition,
            belongings_memory: belongings_memory,
            task_completion: task_completion,
            application_id: application_id,
            total_mark: total_mark,
            letter_number_distinction: letter_number_distinction,
            stimuli_discrimination: stimuli_discrimination,
            auditory_memory: auditory_memory,
            quick_responses: quick_responses,
            sustained_attention: sustained_attention,
            environmental_perception: environmental_perception,
            quick_comprehension: quick_comprehension,
            math_problem_solving: math_problem_solving,
            quranic_verses_recall: quranic_verses_recall,
            first_time_attention: first_time_attention,
            focus_on_significant_stimuli: focus_on_significant_stimuli
        }, config);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function getEvaluationById(id:number) : Promise<Evaluation>{
        try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
  
      // Set up the request config with headers
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      };
  
      const response = await axios.get<Evaluation>(`${BASE_URL}/${id}`, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

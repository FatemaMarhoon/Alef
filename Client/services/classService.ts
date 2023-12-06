// services/userService.ts
import { Class } from '@/types/class'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'http://localhost:3000/class'
import { currentPreschool, currentToken } from './authService';

export async function getClasses(): Promise<Class[]> {
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

        const response = await axios.get<Class[]>(`${BASE_URL}/preschool/${preschool}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
// Function to get a single class by ID
export async function getClassById(classId: string): Promise<Class> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };
        const response = await axios.get<Class>(`${BASE_URL}/${classId}`);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", axiosError.response.data);
            console.error("Response status:", axiosError.response.status);
            console.error("Response headers:", axiosError.response.headers);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error("No response received:", axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", axiosError.message);
        }

        throw axiosError;
    }
}

// Function to create a new class
export async function createClass(newClass: Class): Promise<any> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.post<Class>(BASE_URL, newClass, config);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", axiosError.response.data);
            console.error("Response status:", axiosError.response.status);
            console.error("Response headers:", axiosError.response.headers);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error("No response received:", axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", axiosError.message);
        }

        throw axiosError;
    }
}

// Function to check supervisor availability
// async function checkSupervisorAvailability(supervisor: string): Promise<boolean> {
//     try {
//         const url = `${BASE_URL}/check/${supervisor}`;
//         console.log("Checking supervisor availability. URL:", url);

//         const response = await axios.get<boolean>(url);
//         return response.data;
//     } catch (error) {
//         console.error("Error checking supervisor availability:", error);
//         throw error;
//     }
// }

// // Function to create a new class
// export async function createClass(newClass: Class): Promise<Class> {
//     try {
//         // Check supervisor availability
//         const isSupervisorAvailable = await checkSupervisorAvailability(newClass.supervisor.toString());

//         if (!isSupervisorAvailable) {
//             throw new Error('Supervisor is already assigned to another class in this grade.');
//         }

//         // If supervisor is available, proceed with class creation
//         // const response = await axios.post<Class>(`${BASE_URL}/`, newClass);
//         const response = await axios.post<Class>(BASE_URL, newClass);
//         return response.data;
//     } catch (error) {
//         console.error("Error creating class:", error);
//         // Type assertion for error variable
//         const axiosError = error as AxiosError;

//         // Print Axios error details
//         if (axiosError.response) {
//             console.error("Response data:", axiosError.response.data);
//             console.error("Response status:", axiosError.response.status);
//             console.error("Response headers:", axiosError.response.headers);
//         } else if (axiosError.request) {
//             console.error("No response received:", axiosError.request);
//         } else {
//             console.error("Error setting up the request:", axiosError.message);
//         }

//         throw axiosError;
//     }
// }



// Function to update a class by ID
export async function updateClass(classId: string, updatedClass: Class): Promise<any> {
    try {

        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };
        const response = await axios.put<Class>(`${BASE_URL}/${classId}`, updatedClass, config);
        return response;
    } catch (error) {
        console.error("Error updating student:", error);
        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", axiosError.response.data);
            console.error("Response status:", axiosError.response.status);
            console.error("Response headers:", axiosError.response.headers);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error("No response received:", axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", axiosError.message);
        }

        throw axiosError;
    }

}

// Function to delete a class by ID
export async function deleteClass(classId: string): Promise<void> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };
        await axios.delete(`${BASE_URL}/${classId}`, config);
    } catch (error) {
        throw error;
    }
}


// Function to get the sum of class capacities for a specific grade
export async function getSumOfClassCapacitiesByGrade(grade: string): Promise<number> {
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

        const response = await axios.get<number>(`${BASE_URL}/preschool/${preschool}/sum/${grade}`);
        return response.data;
    } catch (error) {
        console.error("Error getting sum of class capacities:", error);

        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            console.error("Response data:", axiosError.response.data);
            console.error("Response status:", axiosError.response.status);
            console.error("Response headers:", axiosError.response.headers);
        } else if (axiosError.request) {
            console.error("No response received:", axiosError.request);
        } else {
            console.error("Error setting up the request:", axiosError.message);
        }

        throw axiosError;
    }
}
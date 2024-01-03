import { Address, Preschool } from '@/types/preschool'; // Import the Preschool type
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { currentPreschool, currentToken, currentUser, currentUserId, currentUserRole } from './authService';
const BASE_URL = 'https://server-bckggkpqeq-uc.a.run.app/preschools'; // Backend URL for preschools

// export async function getPreschools(): Promise<Preschool[]> {
//     try {
//         var token;
//         await currentToken().then((returnedTOken) => { token = returnedTOken; })

//         // Set up the request config with headers
//         const config: AxiosRequestConfig = {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//             },
//         };

//         const response = await axios.get<Preschool[]>(BASE_URL, config);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }



export async function getPreschools(): Promise<Preschool[]> {
    try {
        var userid;
        const role = await currentUserRole();


        // Check if the user is an admin
        if (role === 'Super Admin') {
            // User is an admin, proceed with the request
            var token;
            await currentToken().then((returnedTOken) => { token = returnedTOken; })
            const config: AxiosRequestConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get<Preschool[]>(BASE_URL, config);
            return response.data;
        } else {
            // User is not an admin, handle accordingly (e.g., show an error message)
            throw new Error('Access Denied. User is not an admin.');
        }
    } catch (error) {
        console.error('Error fetching preschools:', error);
        throw new Error('Failed to fetch preschools. Please try again later.');
    }
}


export async function createPreschool(preschool_name: string, request_id: number, plan_id: number, email: string, CR: string, representitive_name: string, phone: string): Promise<any> {
    try {
        var token;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.post<Preschool>(BASE_URL, { preschool_name: preschool_name, request_id: request_id, plan_id: plan_id, email: email, CR: CR, representitive_name: representitive_name, phone: phone }, config);
        return response.data;
    } catch (error) {
        console.error("Error updating status:", error);
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

export async function updatePreschool(preschoolId: string, updatedPreschool: Preschool) {
    try {
        var token;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Make sure to set the content type
            },
        };

        // never overwrite on logo while updating (it would be a file not field)
        const updatedData = {
            preschool_name: updatedPreschool.preschool_name,
            minimum_age: updatedPreschool.minimum_age,
            maximum_age: updatedPreschool.maximum_age,
            monthly_fees: updatedPreschool.monthly_fees,
            cirriculum: updatedPreschool.cirriculum,
            registration_fees: updatedPreschool.registration_fees,
            phone:updatedPreschool.phone,
            email: updatedPreschool.email,
            representitive_name: updatedPreschool.representitive_name,
            description: updatedPreschool.description,
            logoFile:updatedPreschool.logoFile
        }
        const url = `${BASE_URL}/${preschoolId}`;
        const response = await axios.put(url, updatedData, config);
        return response;
    } catch (error) {
        console.log(error);
        const axiosError = error as AxiosError;
        throw axiosError;
    }
}

export async function deletePreschool(preschoolId: string): Promise<void> {
    try {
        var token;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };
        const url = `${BASE_URL}/${preschoolId}`;
        await axios.delete(url, config);
    } catch (error) {
        throw error;
    }
}
export async function getPreschoolById(preschoolId: string): Promise<Preschool> {
    try {
        var token;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const url = `${BASE_URL}/${preschoolId}`;
        const response = await axios.get<Preschool>(url, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching preschool by ID:', error);
        const axiosError = error as AxiosError;
        throw axiosError;
    }
}

export async function updatePreschoolAddress(address: Address) {
    try {
        var token;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };
        const url = `${BASE_URL}/address/${address.id}`;
        const response = await axios.put(url, address, config);
        return response;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError;
    }
}


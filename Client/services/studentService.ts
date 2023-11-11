import { Student } from '@/types/student'; // Import the Student type
import axios, { AxiosRequestConfig } from 'axios';
import { User } from '@/types/user'
const BASE_URL = 'http://localhost:3000/student'; // Backend URL for students
function currentUser(): User | null {
    const userObjectString = localStorage.getItem('currentUser');
    if (userObjectString) {
        const userObject = JSON.parse(userObjectString);
        return userObject;
    }
    return null;
}
export async function getStudents(): Promise<Student[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        //  const response = await axios.get<Student[]>(BASE_URL, config);
        const response = await axios.get<Student[]>(`${BASE_URL}?preschool=${currentUser()?.preschool_id}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getStudentById(studentId: string): Promise<Student> {
    try {
        const response = await axios.get<Student>(`${BASE_URL}/${studentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function createStudent(student: Student): Promise<Student> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.post<Student>(BASE_URL, student, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function deleteStudent(studentId: string): Promise<void> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        // Make the DELETE request to the API
        await axios.delete(`${BASE_URL}/students/${studentId}`, config);
    } catch (error) {
        throw error;
    }
}
// Add more student-related functions as needed (e.g., updateStudent, deleteStudent)
// export const updateStudent = async (studentId: string, studentData) => {
//     try {
//         // Make a PUT request to update the student
//         const response = await axios.put(`${BASE_URL}/students/${studentId}`, studentData);

//         // Return the response data
//         return response.data;
//     } catch (error) {
//         // Handle errors
//         throw error;
//     }
// };
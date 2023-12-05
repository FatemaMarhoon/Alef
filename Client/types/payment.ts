import { Student } from "./student";

export interface Payment {
    id: number;
    status: string;
    type: string;
    fees: number;
    due_date: string;
    notes: string;
    paid_on: string;
    student_id: number;
    createdAt:string;
    Student?:Student
}
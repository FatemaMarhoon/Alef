import { Student } from "./student";

export interface Payment {
    id: number;
    status: string;
    type: string;
    fees: number;
    due_date: Date;
    notes: string;
    paid_on: Date;
    student_id: number;
    created_at:Date;
    Student?:Student
}
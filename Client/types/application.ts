import { Evaluation } from "./evaluation";
import { User } from "./user";

export interface Application {
    id: number;
    email: string;
    preschool_id: number;
    guardian_type: string;
    status: string;
    student_name: string;
    student_CPR: number;
    gender:string;
    grade:string;
    guardian_name: string;
    phone: string;
    student_DOB: Date;
    medical_history: string;
    created_by: number; //user id
    User : User;
    Application_Evaluation: Evaluation;
    createdAt: string;
    updatedAt: string;
  }
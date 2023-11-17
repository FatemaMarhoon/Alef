export interface ApplicationPOST {
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
    passport:File | undefined;
    certificate_of_birth:File | undefined;
    personal_picture:File | undefined;
    created_by: number; 
    createdAt: string;
    updatedAt: string;
  }
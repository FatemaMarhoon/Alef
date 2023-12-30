export interface Student {
    id: number;
    preschool_id: number;
    class_id?: number;
    student_name: string;
    grade: string;
    DOB: Date;
    CPR: number;
    contact_number1: number;
    contact_number2: number;
    guardian_name: string;
    enrollment_date: Date;
    medical_history: string;
    gender: string;
    personal_picture: string; // Assuming 'personal_picture' is a URL or null
    certificate_of_birth: string; // Assuming 'certificate_of_birth' is a URL or null
    passport: string  // Assuming 'passport' is a URL or null
    createdAt: Date;
    updatedAt: Date;
    user_id: number | null; // Assuming 'user_id' is optional

    passportFile?: File;
    certificate_of_birthFile?: File;
    personal_pictureFile?: File;

}

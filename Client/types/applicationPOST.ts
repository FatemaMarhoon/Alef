export interface ApplicationPOST {
  email?: string;
  guardian_type?: string;
  status?: string;
  student_name?: string;
  student_CPR?: number;
  gender?: string;
  grade?: string;
  guardian_name?: string;
  phone?: string;
  student_DOB?: string;
  medical_history?: string;
  passport?: File;
  certificate_of_birth?: File;
  personal_picture?: File;
}

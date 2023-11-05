export interface User {
    id: number;
    email: string;
    password: string;
    role_name: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    preschool_id: number | null;
  }
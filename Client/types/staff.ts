export interface Staff {
    id?: number;
    preschool_id: number;
    staff_role_name: string;
    name: string;
    CPR: number;
    phone: number;
    hire_date: Date;
    email?: string;
    user_id?:number;
}

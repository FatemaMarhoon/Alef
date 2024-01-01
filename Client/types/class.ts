export interface Class {
    id: number;
    preschool_id: number;
    supervisor: number;
    class_name: string;
    grade: string;
    capacity: number;
    classroom: string;
    Preschool: {
        id: number;
        preschool_name: string;
        plan_id: number;

    };
    Staff: {
        id: number;
        preschool_id: number;
        staff_role_name: string;
        name: string;
        CPR: number;
        phone: number;
        hire_date: string;
        email: string;

    };
}

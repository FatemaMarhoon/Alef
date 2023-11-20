export interface Class {
    id: number;
    preschool_id: number;
    supervisor: string;
    class_name: string;
    grade: string;
    capacity: number;
    classroom: string;
    // createdAt: string; /
    // updatedAt: string; 
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

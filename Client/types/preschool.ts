export interface Preschool {
    // preschool_name: string;
    id?:number;
    preschool_name: string | undefined;
    plan_id: number | undefined;
    request_id: number | undefined;
    minimum_age: number | undefined;
    maximum_age: number | undefined;
    monthly_fees: number | undefined;
    cirriculum: string | undefined;
    registration_fees: number | undefined;
    phone?: string;
    email?: string;
    logo?: string;
    logoFile?:File;
    representitive_name?: string;
    description?:string;
    Address?: Address;
    Media?: string;
}

interface Address {
    id?: number;
    longitude: number,
    latitude: number;
    area: string;
    road: number;
    building: number;
    preschool_id: number;
}

interface Media {
    id?: number;
    file:string;
    type:string
}
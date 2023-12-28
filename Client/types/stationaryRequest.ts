export interface StationaryRequest {
    id: number;
    status_name: string;
    staff_id: number;
    stationary_id: number;
    requested_quantity: number;
    notes?: string;
    preschool_id: number;
    class_id: number;
}

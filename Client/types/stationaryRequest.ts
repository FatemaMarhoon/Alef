export interface StationaryRequest {
    status_name: string;
    staff_id: string;
    stationary_id: number;
    requested_quantity: number;
    notes?: string;
}

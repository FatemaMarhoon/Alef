import { Class } from "./class";

export interface Event {
    id: number;
    preschool_id: number;
    event_name: string,
    event_date: Date;
    notes: string;
    notify_parents: boolean,
    notify_staff: boolean,
    public_event: boolean,
    created_by: number,
    Classes?: Class[]
}

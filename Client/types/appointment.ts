import { Application } from "./application";

export interface Appointment {
    id: number;
    date:string;
    time:string;
    application_id:number;
    Application?:Application
  }
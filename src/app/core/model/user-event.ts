import { EventStatus } from "./eventstatus.enum";

export interface UserEvent {
    id:number;
    status: EventStatus;
    organizerName: string;
    isOrganizer: boolean;
    name: string;
    reason: string;
    campusId:number;
    campusName: string;
    startDate: Date;
    deadline: Date;
    maxMembers: number;
    currentMembers: number;
}

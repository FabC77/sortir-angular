import { EventStatus } from "./eventstatus.enum";

export interface EventModel {
    id: number;
    status: EventStatus;
    organizerName: string;
    isCreator: boolean;
    isEventMember: boolean;
    name: string;
    infos: string;
    reason: string;
    picture: Uint8Array; 
    locationId: string;
    locationName: string;
    address: string;
    campusId: number;
    campusName: string;
    startDate: Date;
    duration: string; 
    deadline: Date;
    maxMembers: number;
    currentMembers: number;
    lastUpdated: Date;
   
  }
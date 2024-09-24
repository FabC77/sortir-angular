import { EventStatus } from "./eventstatus.enum";
import Member from "./member";

export interface EventModel {
    id: number;
    status: EventStatus;
    organizerName: string;
    creator: boolean;
    eventMember: boolean;
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
    members: Member[];
   
  }
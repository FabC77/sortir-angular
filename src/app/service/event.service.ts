import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { UserEvent } from '../core/model/user-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {


  }

  createEvent(form: any): Observable<any> {
    return this.http.post<{ id: number }>(`${environment.baseUrl}/event/create`, form);
  };

  getEvents():Observable<UserEvent[]>{
   return this.http.get<UserEvent[]>(`${environment.baseUrl}/events}`);
  }

}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environment';
import { UserEvent } from '../core/model/user-event';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Campus from '../core/model/campus';
import { EventModel } from '../core/model/eventModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, 
    private route: Router, 
    private authService: AuthService) {


  }

  createEvent(form: any): Observable<any> {
    return this.http.post<{ id: number }>(`${environment.baseUrl}/event/create`, form);
  };

  getEvents():Observable<UserEvent[]>{
   return this.http.get<UserEvent[]>(`${environment.baseUrl}/event/user-events`)
   .pipe(
    catchError((err) => {
      if (err.status === 403) {
     this.authService.expired();
      }
      return throwError(() => err);
    })
  );
  }
  getCampuses():Observable<Campus[]>{
    return  this.http.get<Campus[]>(`${environment.baseUrl}/campuses`);
    }
  searchEvents(form:any): Observable<EventModel[]>{
    return this.http.post<EventModel[]>(`${environment.baseUrl}/event/search`,form);
  }

}


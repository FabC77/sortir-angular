import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {


  }

  createEvent(form: any): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${environment.baseUrl}/event/create`, form);
  };
}


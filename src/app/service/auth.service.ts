import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Credentials from '../model/credentials';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(credentials: Credentials): Observable<Object> {
    console.log(credentials);

    return new Observable<Object>(subscriber => {
      this.http.post<any>(`${environment.baseUrl}/auth/authenticate`, credentials)
        .subscribe({
          next: (data) => {
            if (data && data.token) {
              localStorage.setItem('authToken', data.token);
              localStorage.setItem('fullName', data.fullName);
              console.log('Token stored successfully:', data.token);
              subscriber.next(data);
              subscriber.complete();
            } else {
              subscriber.error('Token is missing in the response');

            }
          },
          error: (response) => {
            if (response && response.error) {
              if (response.error.message) {
                console.error('Error message:', response.error.message);
              } else {
                console.error('Error response received without a message:', response.error);
              }
              subscriber.error(response.error);
            } else {
              console.error('Null or undefined error response received');
              subscriber.error('An unknown error occurred');
            }
          }
        });

    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('id_token');
  }
  logout() {
    const token = localStorage.getItem('id_token') || sessionStorage.getItem('id_token');
  
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      this.http.post<any>(`${environment.baseUrl}/auth/logout`, {}, { headers }).subscribe({
        next: () => {
          localStorage.removeItem('id_token');
          localStorage.removeItem('fullName');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error during logout:', err);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

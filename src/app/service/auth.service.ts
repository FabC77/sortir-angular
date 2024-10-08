import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Credentials from '../core/model/credentials';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  public login(credentials: Credentials): Observable<Object> {
    console.log(credentials);

    return new Observable<Object>(subscriber => {
      this.http.post<any>(`${environment.baseUrl}/auth/authenticate`, credentials)
        .subscribe({
          next: (data) => {
            if (data && data.token) {
                  this.loggedInSubject.next(true);

              localStorage.setItem('authToken', data.token);
              localStorage.setItem('fullName', data.fullName);
              localStorage.setItem('campusId', data.campusId);
              localStorage.setItem('profilePicture', data.profilePicture);
              console.log('Token stored successfully:', data.token);
              subscriber.next(data);
              subscriber.complete();
              this.loggedInSubject.next(true);

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
    return !!localStorage.getItem('authToken');
  }
  logout() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      this.http.post<any>(`${environment.baseUrl}/auth/logout`, {}, { headers }).subscribe({
        next: () => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('fullName');
          localStorage.removeItem('campusId');
          localStorage.removeItem('profilePicture');
          this.router.navigate(['/login']);
          this.loggedInSubject.next(false);

        },
        error: (err) => {
          console.error('Error during logout:', err);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  expired(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('fullName');
    localStorage.removeItem('campusId');
    localStorage.removeItem('profilePicture');

    this.router.navigate(['/login']);
  }

checkTokenValidity() {
  const jwtDecode = require('jwt-decode');

  const token = localStorage.getItem('authToken');
  if (token) {
      const decodedToken = jwtDecode(token) as any;
      const now = new Date().getTime() / 1000;
      if (decodedToken.exp < now) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('campusId');
          localStorage.removeItem('fullName');
          localStorage.removeItem('profilePicture');

          this.router.navigate(['/login']);
      }
  }
}
}

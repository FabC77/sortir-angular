import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private baseUrl: string = environment.baseUrl;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    isRemembered: new FormControl(false)
  });

  constructor(private router: Router, private http:HttpClient) { }


connect() {
  this.http.post(`${this.baseUrl}/auth/authenticate`,this.loginForm.value).subscribe({
    next: (data:any) => {
      console.log('Response:', data);
      if (data && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('fullName', data.fullName);
        console.log('Token stored successfully:', data.token);
        this.router.navigate(['/home']);
      }
    },
    error: (error: HttpErrorResponse) => {
      console.error('Login failed', error);

      if (error.status === 401) {
        alert('Invalid credentials. Please try again.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  })

}

}

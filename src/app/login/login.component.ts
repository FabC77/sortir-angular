import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environment';
import { AuthService } from '../service/auth.service';
import Credentials from '../model/credentials';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private baseUrl: string = environment.baseUrl;
  error!: string;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    isRemembered: new FormControl(false)
  });

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }


  connect() {
    this.authService.login(<Credentials>this.loginForm.value).subscribe({
      next:
        () => {
          console.log("User is logged in");
          this.router.navigate(['/home']);
        },
      error: (err) => {
        this.error = err.message;
      }
    });
    this.loginForm.reset();
  }

}

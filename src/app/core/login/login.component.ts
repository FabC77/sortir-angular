import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { AuthService } from '../../service/auth.service';
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
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required]
      ],
      password: [
        '',
        [Validators.required]
      ],
      isRemembered: false
    })

  }
  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private formBuilder: FormBuilder) { }


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
  invalidUsername() {
    return this.loginForm.get('username')?.invalid &&
      (this.loginForm.get('username')?.dirty || this.loginForm.get('username')?.touched);
  }

  invalidPassword() {
    return this.loginForm.get('password')?.invalid &&
      (this.loginForm.get('password')?.dirty || this.loginForm.get('password')?.touched);
  }
  invalidCredentials() {
    return this.loginForm.pristine || this.loginForm.invalid;
  }

}

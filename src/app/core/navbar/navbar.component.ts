import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MenuButtonComponent } from "../../shared/menu-button/menu-button.component";
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButton, MatButtonModule, MenuButtonComponent, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  s3: string= environment.awsS3;

  private baseUrl: string = environment.baseUrl;
  fullName: string = '';
isLoggedIn: boolean = false;
profilePicture: any=null;


  constructor(private router: Router, private http: HttpClient, private authService:AuthService) { }


  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.fullName = localStorage.getItem('fullName') || '';
      this.profilePicture = localStorage.getItem('profilePicture') || '';
    });

  }


  logout() {
   this.authService.logout();
  }
  
}
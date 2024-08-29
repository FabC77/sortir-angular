import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButton,MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private baseUrl: string = environment.baseUrl;
  fullName: string = '';
isLoggedIn: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService:AuthService) { }


  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.fullName = localStorage.getItem('fullName') || '';
    });

  }


  logout() {
   this.authService.logout();
  }
  
}
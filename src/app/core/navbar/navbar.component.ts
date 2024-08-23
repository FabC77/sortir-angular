import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private baseUrl: string = environment.baseUrl;
  fullName: string = '';

  constructor(private router: Router, private http: HttpClient, private authService:AuthService) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  ngOnInit() {
    this.fullName = localStorage.getItem('fullName') || '';
  }


  logout() {
   this.authService.logout();
  }
  
}
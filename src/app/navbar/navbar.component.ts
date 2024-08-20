import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private router: Router, private http: HttpClient) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  ngOnInit() {
    this.fullName = localStorage.getItem('fullName') || '';
  }

  logout() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.post(`${this.baseUrl}/auth/logout`, {}, { headers }).subscribe({
        next: () => {
          console.log('Logout completed');
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          localStorage.removeItem('fullName');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Logout failed', error);
          alert('Erreur durant le logout');
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
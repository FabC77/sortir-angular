import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuButtonComponent } from '../../shared/menu-button/menu-button.component';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-small-navbar',
  standalone: true,
  imports: [MenuButtonComponent],
  templateUrl: './small-navbar.component.html',
  styleUrl: './small-navbar.component.scss'
})
export class SmallNavbarComponent {
  s3: string= environment.awsS3;

  private baseUrl: string = environment.baseUrl;
  fullName: string = '';
isLoggedIn: boolean = false;
profilePicture: any='';


  constructor(private router: Router, private authService:AuthService){

  }


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

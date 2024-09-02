import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss'
})
export class MenuButtonComponent {

@Input() label= '';
@Input() link= '';
constructor(private route: Router){}

navigateTo(link: string) {
  this.route.navigate([link]);}
}

import { Component, Input } from '@angular/core';
import Member from '../../core/model/member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {

  @Input() members!: Member[];

  constructor( private router: Router){

  }
  ngOnInit() {
    
  }
}

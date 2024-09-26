import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserEvent } from '../../core/model/user-event';
import { EventModel } from '../../core/model/eventModel';
import { EventStatusService } from '../../service/event-status.service';
import { EventStatus } from '../../core/model/eventstatus.enum';
import { DatePipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-event-panel',
  standalone: true,
  imports: [DatePipe, TitleCasePipe,
    MatProgressSpinner, NgOptimizedImage
  ],
  templateUrl: './event-panel.component.html',
  styleUrl: './event-panel.component.scss'
})
export class EventPanelComponent {
  isLoading: boolean = true;
  deadlineSoon: boolean = false;
  deadlineMessage: string = '';
  @Input()alreadyRegistered: boolean = false;
  @Input() event: any;
  eventId!: number;
updatedRecently: boolean = false;


  constructor(private router: Router, private statusService: EventStatusService) {
  }



  ngOnInit() {
    this.deadlineMessage = this.convertDeadline(this.event.deadline);
    this.eventId = this.event.id;
this.updateCheck();

    this.isLoading = false;
    console.log("PANEL LOADED");
  }


  navigateTo() {
    this.router.navigate(['event/' + this.event.id]);
  }
  convertStatus(status: EventStatus): string {
    return this.statusService.getStatusTranslation(status);
  }

  updateCheck(){
    const now = new Date();
    

  }
  convertDeadline(deadline: Date): string {
    const now = new Date();
    const dead = new Date(deadline);
    let timeDiff = dead.getTime() - now.getTime();

    let diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let diffInHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (timeDiff <= 0) {
      this.deadlineSoon = false;  
      return "Les inscriptions sont closes.";
    }

    if (diffInDays > 0) {
      this.deadlineSoon = true;
      return `Fin des inscriptions : ${diffInDays} jour${diffInDays > 1 ? 's' : ''}.`;
    } else if (diffInHours > 0) {
      this.deadlineSoon = true;

      return `Fin des inscriptions : ${diffInHours} heure${diffInHours > 1 ? 's' : ''}.`;
    } else {
      this.deadlineSoon = true;

      return "Fin des inscriptions : moins d'une heure.";
    }

  }
}


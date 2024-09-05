import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserEvent } from '../../core/model/user-event';
import { EventModel } from '../../core/model/eventModel';
import { EventStatusService } from '../../service/event-status.service';
import { EventStatus } from '../../core/model/eventstatus.enum';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-event-panel',
  standalone: true,
  imports: [DatePipe, TitleCasePipe,
    MatProgressSpinner
  ],
  templateUrl: './event-panel.component.html',
  styleUrl: './event-panel.component.scss'
})
export class EventPanelComponent   {
isLoading:boolean=false;
  deadlineSoon: boolean = false;
  deadlineMessage: string='';
  @Input() event!: any;

  constructor(private router: Router, private statusService: EventStatusService) {
  }


 
  ngOnInit() {
    this.deadlineMessage = this.convertDeadline(this.event.deadline);
      this.isLoading = false;
   }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
  convertStatus(status: EventStatus): string {
    return this.statusService.getStatusTranslation(status);
  }

  convertDeadline(deadline: Date): string {
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();

    const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));


    if (diffInDays > 0) {
      this.deadlineSoon = true;
      return `Il reste ${diffInDays} jour${diffInDays > 1 ? 's' : ''} avant la deadline.`;
    } else if (diffInHours > 0) {
      this.deadlineSoon = true;

      return `Il reste ${diffInHours} heure${diffInHours > 1 ? 's' : ''} avant la deadline.`;
    } else {
      this.deadlineSoon = true;

      return "Moins d'une heure avant la deadline.";
    }

  }
}


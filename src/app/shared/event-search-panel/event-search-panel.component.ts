import { Component, Input } from '@angular/core';
import { EventModel } from '../../core/model/eventModel';
import { Router } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { EventStatus } from '../../core/model/eventstatus.enum';
import { EventStatusService } from '../../service/event-status.service';


@Component({
  selector: 'search-panel',
  standalone: true,
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './event-search-panel.component.html',
  styleUrl: './event-search-panel.component.scss'
})
export class EventSearchPanelComponent {


  @Input() event!: EventModel;

  constructor(private router: Router, private statusService: EventStatusService) {

  }
  convertStatus(status: EventStatus): string {
    return this.statusService.getStatusTranslation(status);
  }

  navigateTo() {
    this.router.navigate(['event/' + this.event.id]);
  }
}

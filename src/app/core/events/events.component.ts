import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { UserEvent } from '../model/user-event';
import { DatePipe } from '@angular/common';
import { EventStatusService } from '../../service/event-status.service';
import { EventStatus } from '../model/eventstatus.enum';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatTableModule, DatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
isLoading: boolean=true;
  openPage(row: any) {
   this.route.navigate(['event/'+row.id]);
  }
  events: UserEvent[] = [];
  displayedColumns: string[] = [ 'name', 'startDate', 'organizerName', 'currentMembers', 'status'];

  constructor(private route: Router, private eventService: EventService
    , private enumService: EventStatusService
  ) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      {
        next: (data: UserEvent[]) => {
          console.log("data received : " + JSON.stringify(data));

          this.events = data;
          this.isLoading=false;
        },
        error: (err) => {
          console.log("error : ", err);

        }
      }
    )

  }
  getConvertedStatus(enumRaw: EventStatus): string {
    return this.enumService.getStatusTranslation(enumRaw);
    }
}

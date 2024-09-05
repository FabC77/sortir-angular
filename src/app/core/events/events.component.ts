import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { UserEvent } from '../model/user-event';
import { DatePipe } from '@angular/common';
import { EventStatusService } from '../../service/event-status.service';
import { EventStatus } from '../model/eventstatus.enum';
import { EventPanelComponent } from '../../shared/event-panel/event-panel.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatTableModule, DatePipe, EventPanelComponent
    , MatProgressSpinnerModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  isLoading: boolean = true;

  events: UserEvent[] = [];
  createdEvents: UserEvent[] = [];
  nextEventsColumn: string[] = ['name', 'startDate', 'organizerName', 'currentMembers', 'status'];
  displayedColumns: string[] = ['name', 'startDate', 'currentMembers', 'status'];

  constructor(private route: Router, private eventService: EventService
    , private enumService: EventStatusService
  ) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      {
        next: (data: UserEvent[]) => {
          console.log("data received : " + JSON.stringify(data));
          this.sortEvents(data);

        },
        error: (err) => {
          console.log("error : ", err);

        }
      }
    )
  

  }
 
  ngAfterContentInit(){
    this.isLoading = false;
   }

  openPage(row: any) {
    this.route.navigate(['event/' + row.id]);
  }

  getConvertedStatus(enumRaw: EventStatus): string {
    return this.enumService.getStatusTranslation(enumRaw);
  }

  sortEvents(data: UserEvent[]): void {
    this.createdEvents = data.filter(element => element.organizer === true);
  this.events = data.filter(element => element.organizer !== true);

  console.log("APRES TRANSFERT : createdEvents not empty? :  ",this.createdEvents.length>0);
  
  }
}



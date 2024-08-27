import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { UserEvent } from '../model/user-event';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
openPage(_t54: any) {
throw new Error('Method not implemented.');
}
  events: UserEvent[] = [];
  displayedColumns: string[] = ['id','Nom de la sortie', 'Date de la sortie', 'Organisateur-rice','Participants', 'Deadline'];

  constructor(private route: Router, private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      {
        next: (data: UserEvent[]) => {
          console.log("data received : " + JSON.stringify(data));
          
          this.events = data;
        },
        error: (err) => {
          console.log("error : ", err);

        }
      }
    )

  }
}

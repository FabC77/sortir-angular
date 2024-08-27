import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment';
import { AuthService } from '../../service/auth.service';
import { MatButton } from '@angular/material/button';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { EventStatusService } from '../../service/event-status.service';
import { EventStatus } from '../model/eventstatus.enum';
import { EventModel } from '../model/eventModel';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [MatButton, DatePipe, TitleCasePipe],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent {
leaveEvent() {
throw new Error('Method not implemented.');
}
updateEvent() {
throw new Error('Method not implemented.');
}
register() {
throw new Error('Method not implemented.');
}
  event!:EventModel;
  form:Object={"reason": "parce que"}

  constructor(private route: ActivatedRoute, private http:HttpClient,
    private enumService: EventStatusService
  ) {  }
  
  ngOnInit():void {
    console.log("ngOnInit called");
  const eventId = this.route.snapshot.paramMap.get('id');
  console.log("Event ID: ", eventId);

  this.http.get<EventModel>(`${environment.baseUrl}/event/${eventId}`).subscribe({
    next: (data:EventModel)=> {
      console.log("Data received: ", data);
      this.event = data;
    },
    error: (err) =>{
      console.log("HTTP GET Error: ", err );
    }
  });
    }
    cancel() {
      this.http.put(`${environment.baseUrl}/event/${this.event.id}/cancel`,this.form)
      .subscribe({
            next: (data) => {
                console.log("ok");
            },
            error: (err) => {
                console.log("error ",err);
            }
        });
      }
      isLocationNotNamed():boolean {
        const nameWords = this.event.name.toLowerCase().split(' ');
        const addressLower = this.event.address.toLowerCase();
        for (const word of nameWords) {
          if (!addressLower.includes(word)) {
            return false;
          }
        }
        return true;
      }
      getConvertedStatus(enumRaw: EventStatus): string {
        return this.enumService.getStatusTranslation(enumRaw);
        }
  }

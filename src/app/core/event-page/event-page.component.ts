import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environment';
import { AuthService } from '../../service/auth.service';
import { MatButton } from '@angular/material/button';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { EventStatusService } from '../../service/event-status.service';
import { EventStatus } from '../model/eventstatus.enum';
import { EventModel } from '../model/eventModel';
import { EventService } from '../../service/event.service';
import Member from '../model/member';
import { MembersComponent } from "../../shared/members/members.component";

@Component({
  selector: 'event-page',
  standalone: true,
  imports: [MatButton, DatePipe, TitleCasePipe, MembersComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent {
  s3: string=environment.awsS3;
  event!: EventModel;
  members!: Member[];
  form: Object = { "reason": "parce que" }
  hasPicture: boolean = false;
  constructor(private route: ActivatedRoute, private router:Router, private http: HttpClient,
    private enumService: EventStatusService, private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.loadData();
  
  }

  loadData(): void {
    const eventIdParam = this.route.snapshot.paramMap.get('id');
    console.log("Event ID: ", eventIdParam);
    const eventId = Number(eventIdParam)
    this.eventService.getEventById(eventId).subscribe({
      next: (data: EventModel) => {
        console.log("Data received: ", data);
        this.event = data;
        this.members = data.members;
      },
      error: (err) => {
        console.log("HTTP GET Error: ", err);
      }
    });
  }

  cancel() {
    this.http.put(`${environment.baseUrl}/event/${this.event.id}/cancel`, this.form)
      .subscribe({
        next: (data) => {
          console.log("ok");
          this.router.navigate(['/events'])
        },
        error: (err) => {
          console.log("error ", err);
        }
      });
  }
  isLocationNotNamed(): boolean {
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
  leaveEvent() {
    this.eventService.leaveEvent(this.event.id).subscribe({
      next: (members) => {
        this.members = members;
        this.event.currentMembers--;
        this.event.eventMember = false;
      },
      error: (err) => {
        console.log("Erreur d'inscription : ", err);
        this.loadData();

      }
    })
  }
  updateEvent() {
    throw new Error('Method not implemented.');
  }
  join() {
    this.eventService.joinEvent(this.event.id).subscribe({
      next: (members) => {
        this.members = members;
        this.event.currentMembers++;
        this.event.eventMember = true;
      },
      error: (err) => {
        console.log("Erreur d'inscription : ", err);
        this.loadData();

      }
    })
  }
}

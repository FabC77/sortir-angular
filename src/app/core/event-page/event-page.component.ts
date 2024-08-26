import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment';
import { AuthService } from '../../service/auth.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [MatButton],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent {
  event:any;
  form:Object={"reason": "parce que"}

  constructor(private route: ActivatedRoute, private http:HttpClient) {

  }
  
  ngOnInit():void {
    console.log("ngOnInit called");
  const eventId = this.route.snapshot.paramMap.get('id');
  console.log("Event ID: ", eventId);

  this.http.get(`${environment.baseUrl}/event/${eventId}`).subscribe({
    next: (data)=> {
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

  }

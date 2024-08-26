import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent {
  event:any;

  constructor(private route: ActivatedRoute, private http:HttpClient){

  }
  ngOnInit():void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.http.get(`${environment.baseUrl}/event/${eventId}`).subscribe(data => {
      console.log("Data received: ", data);

      this.event = data;
    });
    
  }
}

import { Component } from '@angular/core';
import { EventPanelComponent } from "../../shared/event-panel/event-panel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

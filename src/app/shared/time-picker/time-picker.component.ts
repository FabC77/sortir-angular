import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [   MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule, FormsModule],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss'
})
export class TimePickerComponent {
  hours: string[] = [];
  minutes: string[] = [];
  selectedHour: string | null = null;
  selectedMinute: string | null = null;

  constructor() {
    this.generateTimeOptions();
  }

  generateTimeOptions(): void {
    // Générer les heures
    for (let i = 0; i < 24; i++) {
      this.hours.push(i < 10 ? '0' + i : i.toString());
    }

    // Générer les minutes par tranche de 5 minutes
    for (let i = 0; i < 60; i += 5) {
      this.minutes.push(i < 10 ? '0' + i : i.toString());
    }
  }

  openHourDropdown(): void {
    // Logic to open hour dropdown
  }

  openMinuteDropdown(): void {
    // Logic to open minute dropdown
  }

  onHourSelected(hour: string): void {
    this.selectedHour = hour;
  }

  onMinuteSelected(minute: string): void {
    this.selectedMinute = minute;
  }
}

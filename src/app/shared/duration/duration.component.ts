import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
@Component({
  selector: 'app-duration',
  standalone: true,
  imports: [MatSliderModule, FormsModule],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.scss'
})
export class DurationComponent {

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  selectedDuration: string = 'Inconnue';

  onSliderChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedDuration = this.formatLabel(Number(target.value));
   this.valueChange.emit(Number(target.value));
  }
  formatLabel(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    if (value == 0) return 'Inconnue';
    // Format l'affichage comme "1h 00m" ou "0h 10m"
    return `${hours}h ${minutes.toString().padStart(2,'0')}m`;
  }


}

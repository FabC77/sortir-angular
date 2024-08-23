import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddressInputComponent } from '../../shared/address-input/address-input.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { TimePickerComponent } from "../../shared/time-picker/time-picker.component";
import { DurationComponent } from "../../shared/duration/duration.component";

@Component({
  selector: 'app-new-event',
  standalone: true,
  providers: [provideNativeDateAdapter()],

  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule,
    MatSlideToggleModule, MatCheckboxModule, AddressInputComponent,
    FormsModule, NgxMatTimepickerModule, TimePickerComponent, DurationComponent],
  templateUrl: './new-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './new-event.component.scss'
})
export class NewEventComponent {


  eventForm!: FormGroup;
  error = signal('');
  numbers: number[] = Array.from({ length: 200 }, (_, i) => i + 1);
  startDateTime!: Date;
  durationRaw!: Date;

  constructor(private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      infos: [''],
      isDraft: [false],
      startDate: [new Date(), Validators.required],
      locationId: ['', Validators.required],
      locationName: [''],
      longitude: [-1, Validators.required],
      latitude: [-1, Validators.required],
      cityName: ['', Validators.required],
      address: ['', Validators.required],
      duration: { hours: 0, minutes: 0 },
      deadline: [new Date(), Validators.required],
      maxMembers: [1, Validators.required],
    });
  }


  // Propriété pour stocker la valeur
  onDurationChange(value: number): void {
    const h = Math.floor(value / 60);
    const m = value % 60;
    this.eventForm.patchValue({ duration: { hours: h, minutes: m } });// Stocker la valeur dans le format désiré
    console.log("Data onSubmit Parent: " + JSON.stringify(this.eventForm.value));
  
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    this.updateStartDateTime(selectedDate, this.startDateTime?.getHours(), this.startDateTime?.getMinutes());
  }

  onTimeChange(event: any): void {
    const selectedTime = event;
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    this.updateStartDateTime(this.startDateTime || new Date(), hours, minutes);
  }
  private updateStartDateTime(date: Date, hours: number, minutes: number): void {
    const updatedDateTime = new Date(date);
    updatedDateTime.setHours(hours);
    updatedDateTime.setMinutes(minutes);
    this.startDateTime = updatedDateTime;
    this.eventForm.patchValue({ startDate: updatedDateTime });
  }

  updateCheckbox(arg0: boolean) {
    console.log('draft status: ' + arg0);
    this.eventForm.patchValue({ isDraft: arg0 });
    console.log('post change ' + this.eventForm.get('isDraft')?.value);

  }
  onAddressSelected(location: any) {
    console.log('Address selected (in parent):', location.properties);
    this.eventForm.patchValue({
      address: location.properties.formatted,
      locationName: location.properties.name,
      longitude: location.properties.lon,
      latitude: location.properties.lat,
      cityName: location.properties.city
    });
  }
  updateErrorMessage() {
    const nameControl = this.eventForm.get('name');
    const deadlineControl = this.eventForm.get('deadline');

    if (nameControl?.hasError('required')) {
      this.error.set('You must enter a name');
    } else if (deadlineControl?.hasError('required')) {
      this.error.set('You must enter a deadline');
    } else {
      this.error.set('');
    }
  }
}
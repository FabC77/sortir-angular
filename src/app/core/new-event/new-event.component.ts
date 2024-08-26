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
import { DurationComponent } from "../../shared/duration/duration.component";
import { CanComponentDeactivate } from '../../service/can-deactivate.guard';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { stringify } from 'querystring';
import { EventService } from '../../service/event.service';


@Component({
  selector: 'app-new-event',
  standalone: true,
  providers: [provideNativeDateAdapter()],

  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule,
    MatSlideToggleModule, MatButton, MatCheckboxModule, AddressInputComponent,
    FormsModule, NgxMatTimepickerModule, DurationComponent,
    NgxMatTimepickerModule, ConfirmDialogComponent],
  templateUrl: './new-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './new-event.component.scss'
})
export class NewEventComponent implements CanComponentDeactivate {
  eventForm!: FormGroup;
  error = signal('');
  errorAddress: string = '';
  numbers: number[] = Array.from({ length: 200 }, (_, i) => i + 1);
  startDateTime!: Date;
  durationRaw!: Date;
  minDate: Date;
  isSubmitting = false; 

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router, private service: EventService) {
    this.minDate = new Date();
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      infos: [''],
      isDraft: [false],
      startDate: [undefined, Validators.required],
      eventTime: [undefined, Validators.required],
      locationId: ['', Validators.required],
      locationName: [''],
      longitude: [-1, Validators.required],
      latitude: [-1, Validators.required],
      cityName: ['', Validators.required],
      address: ['', Validators.required],
      duration: { hours: 0, minutes: 0 },
      deadline: [undefined, Validators.required],
      maxMembers: [2],
    });
  }

  submit() {

    if (this.eventForm.valid) {
this.isSubmitting=true;
      console.log("formulaire:" + JSON.stringify(this.eventForm.value));
      this.service.createEvent(this.eventForm).subscribe({
        next:
          (data) => {
            this.router.navigate([`/event/${data.id}`]);
          },
        error: (err) => {
          this.error = err.message;
        }
      });
      this.eventForm.reset();
      this.isSubmitting=false;

    } else {
      console.log("formulaire non envoyé" + JSON.stringify(this.eventForm.value));
      this.eventForm.markAllAsTouched();
      this.isSubmitting=false;

    }
    this.updateErrorMessage();

  }
  navigateTo(route: string) {
    this.router.navigate([route])
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (this.eventForm.dirty) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter cette page ?'
        }
      });

      return dialogRef.afterClosed();
    }
    return true;
  }
  ngOnDestroy(): void {
    this.eventForm.reset();
  }

  // Propriété pour stocker la valeur
  onDurationChange(value: number): void {
    const h = Math.floor(value / 60);
    const m = value % 60;
    this.eventForm.patchValue({ duration: { hours: h, minutes: m } });// Stocker la valeur dans le format désiré
    console.log("Data onSubmit Parent: " + JSON.stringify(this.eventForm.value));

  }

  onDateChange(event: any): void {
    console.log("in OnDateChange" + event.value);

    const selectedDate = event.value;
    this.updateStartDateTime(selectedDate, this.startDateTime?.getHours() ?? 0, this.startDateTime?.getMinutes() ?? 0);
  }

  onTimeChange(event: string): void {
    console.log("in OnTimeChange: " + event);
    if (!event || event.length < 5) {
      console.error("Heure invalide : " + event);
      return;
    }
    const hours = parseInt(event.substring(0, 2), 10);
    const minutes = parseInt(event.substring(3, 5), 10);
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
      locationId: location.properties.place_id,
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
    const addressControl = this.eventForm.get('locationId');

    if (nameControl?.hasError('required')) {
      this.error.set('You must enter a name');
    } else if (deadlineControl?.hasError('required')) {
      this.error.set('You must enter a deadline');
    } else if (addressControl?.hasError('required')) {
      this.errorAddress = "L'adresse doit être sélectionnée";

    } else {
      this.error.set('');
      this.errorAddress = '';
    }
  }
}
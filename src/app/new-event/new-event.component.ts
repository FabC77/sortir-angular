import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddressInputComponent } from '../address-input/address-input.component';


@Component({
  selector: 'app-new-event',
  standalone: true,
  providers: [provideNativeDateAdapter()],

  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule,
    MatSlideToggleModule, MatCheckboxModule, AddressInputComponent],
  templateUrl: './new-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

  styleUrl: './new-event.component.scss'
})
export class NewEventComponent {
  eventForm!: FormGroup;
  error = signal('');
  numbers: number[] = Array.from({ length: 200 }, (_, i) => i + 1);

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required
      ],
      infos: [''],
      isDraft: [false],
      //TODO: picture, locationId
      locationId:['',Validators.required],
      locationName: [''],
      longitude:[-1,Validators.required],
      latitude:[-1,Validators.required],
cityName: ['', Validators.required],
      address: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      duration: [-1],
      deadline: [new Date(), Validators.required],
      maxMembers: [1, Validators.required],
    });
  }

  onAddressSelected(location: any) {
    console.log('Address selected (in parent):', location.properties);
    this.eventForm.patchValue({
      address:location.properties.formatted, 
      locationName:location.properties.name,
      longitude:location.properties.lon,
      latitude:location.properties.lat,
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
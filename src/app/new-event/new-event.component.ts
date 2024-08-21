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
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-new-event',
  standalone: true,
  providers: [provideNativeDateAdapter()],

  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule, MatSlideToggleModule, MatCheckboxModule],
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
      isDraft:[false],
      //TODO: picture, locationId
      locationName: ['', Validators.required],
      address: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      duration: [-1],
      deadline: [new Date(), Validators.required],
      maxMembers: [1, Validators.required],
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
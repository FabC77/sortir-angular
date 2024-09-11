import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventPanelComponent } from "../../shared/event-panel/event-panel.component";
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import Campus from '../model/campus';
import { EventModel } from '../model/eventModel';
import { debounceTime } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, EventPanelComponent,
    MatFormField, MatSelectModule,
    MatCheckbox,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatInput, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HomeComponent implements OnInit {


  maskedFull: boolean = false;
  campusList!: Campus[];
  selectedCampus!: number;
  isLoading: boolean = true;
  eventsLoading:boolean = true;
  searchedEvents!: EventModel[];
  searchForm = this.formBuilder.group({
    campusId: this.selectedCampus,
    keyword: [''],
    startDate: [null],
    endDate: [null],
    full: true,
  });

  constructor(private router: Router, 
    private cdr: ChangeDetectorRef,
   
    private eventService: EventService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
   
    this.loadCampuses();
    this.setupListeners();
    this.isLoading = false;

  }
 


  private loadCampuses(): void {
    this.eventService.getCampuses().subscribe({
      next: (data: Campus[]) => {
        this.campusList = data;
        console.log("Campus loaded", data);
        const campusId = localStorage.getItem('campusId');

        if (campusId) {
          const campusIndex = data.findIndex(campus => campus.id === parseInt(campusId, 10));
          if (campusIndex !== -1) {
            this.selectedCampus = this.campusList[campusIndex].id;
            this.searchForm.patchValue({
              campusId: this.selectedCampus
            });
          } else {
            console.warn('Campus ID non trouvé dans la liste.');
          }
        } else {
          console.warn('Campus ID non trouvé dans le localStorage.');
        }
        
       
        this.loadEvents();
       
          this.search(); 
    
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Erreur lors du chargement des campus', err);
      }
    });

  }

  private setupListeners(): void {
    this.searchForm.get('keyword')?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(keyword => {

        this.search();

      });
    this.searchForm.get('startDate')?.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(startDate => {
        this.search();
      });


    this.searchForm.get('endDate')?.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(endDate => {
        this.search();
      });

  }

  private loadEvents(): void {
    this.eventsLoading= true;
    this.eventService.searchEvents(this.searchForm.value).subscribe({
      next: (events: EventModel[]) => {
        this.searchedEvents = events;
        console.log("Événements recherchés chargés dans loadEvents:", events.length);
        this.eventsLoading= false;
      },
      error: (err) => {
        console.log("Erreur de récupération des événements", err);
        this.eventsLoading= false;
      }
    });
  }

  search(): void {
    this.eventsLoading= true;
    this.searchedEvents = [];
    this.eventsLoading= false;
    console.log("Recherche avec le formulaire: ", this.searchForm.value);


    this.searchForm.patchValue({
      campusId: this.selectedCampus,
    })
    this.eventService.searchEvents(this.searchForm.value).subscribe({
      next: (events: EventModel[]) => {
        this.searchedEvents = events;
        console.log("Événements recherchés chargés", events.length);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log("Erreur de récupération des événements", err);
      },
      complete: () => {
        this.eventsLoading= false;
      }
    });

  }
  updateFilter() {
    this.maskedFull = !this.maskedFull;
    console.log("masked status: ", this.maskedFull);

  }
  clear() {
 this.searchForm.patchValue({
keyword:'',
startDate:null,
endDate:null,
    
    })};
}

import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, EventPanelComponent,
    MatFormField, MatSelectModule,
    MatProgressSpinnerModule,
    MatInput, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {
  
  campusList!: Campus[];
  selectedCampus!: number;
  isLoading: boolean = true;
  searchedEvents!: EventModel[];
  searchForm = this.formBuilder.group({
    campusId: this.selectedCampus,
    keyword: [''],
    startDate: [null],
    endDate: [null],
    full: true,
  });

  constructor(private router: Router, private eventService: EventService, private formBuilder: FormBuilder) {
 
  }

  ngOnInit(): void {
    this.loadCampuses();
    this.setupKeywordSearch();
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
        this.loadEvents(); // Charger les événements après avoir chargé les campus
      },
      error: (err) => {
        console.log('Erreur lors du chargement des campus', err);
      }
    });
  }

  private setupKeywordSearch(): void {
    this.searchForm.get('keyword')?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(keyword => {
       
          this.search();
        
      });
  }

  private loadEvents(): void {
    this.eventService.searchEvents(this.searchForm.value).subscribe({
      next: (events: EventModel[]) => {
        this.searchedEvents = events;
        console.log("Événements recherchés chargés", events.length);
        this.isLoading = false;
      },
      error: (err) => {
        console.log("Erreur de récupération des événements", err);
        this.isLoading = false;
      }
    });
  }

  search(): void {
    this.searchedEvents = [];
    this.isLoading = true;
    console.log("Recherche avec le formulaire: ", this.searchForm.value);
 

    this.searchForm.patchValue({
      campusId: this.selectedCampus,
    })
    this.eventService.searchEvents(this.searchForm.value).subscribe({
      next: (events: EventModel[]) => {
        this.searchedEvents = events;
        console.log("Événements recherchés chargés", events.length);
      },
      error: (err) => {
        console.log("Erreur de récupération des événements", err);
      }
    });
    this.isLoading = false;

  }
}

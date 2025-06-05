import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { ToursService } from '../../services/tours.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Tour } from '../../models/interfaces';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  activeForm: 'tour' | 'event' = 'tour';
  tourForm: FormGroup;
  eventForm: FormGroup;
  tourImages: File[] = [];
  tourCreateSuccess = signal(false);
  eventCreateSuccess = signal(false);
  tours = signal<Tour[]>([]);

  constructor(
    private fb: FormBuilder,
    private toursService: ToursService,
    private authService: AuthService,
  ) {
    this.tourForm = this.fb.group({
      route: [''],
      desc: [''],
    });

    this.eventForm = this.fb.group({
      tourId: [''],
      date: [''],
      place: [''],
      price: [''],
      amountOfPlaces: [''],
    });
  }

  ngOnInit() {
    this.loadTours();
  }

  loadTours() {
    this.toursService.getAllTours().subscribe({
      next: (tours) => {
        this.tours.set(tours);
      },
      error: (error) => {
        console.error('Failed to load tours:', error);
      }
    });
  }

  setActiveForm(formType: 'tour' | 'event') {
    this.activeForm = formType;
  }

  filesSelected(event: any) {
    let images: FileList = event.target.files;
    if (images) {
      this.tourImages = Array.from(images);
    }
  }

  async createTour() {
    if (this.tourForm.valid && this.tourImages.length > 0) {
      let formData = new FormData();
      formData.append('description', this.tourForm.value.desc);
      formData.append('route', this.tourForm.value.route);
      for (let image of this.tourImages) {
        formData.append('images', image, image.name);
      }

      try {
        const response = await fetch(`${this.toursService.BASE_URL}/provider/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.authService.getToken()!}`
          },
          body: formData
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        await response.json();
        this.tourForm.reset();
        this.tourCreateSuccess.set(true);
        setTimeout(() => this.tourCreateSuccess.set(false), 1000);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please fill all fields and select at least one image');
    }
  }

  async createEvent() {
    if (this.eventForm.valid) {
       
      const dateValue = new Date(this.eventForm.value.date);
      const isoDateString = dateValue.toISOString();

      const eventData = {
        date: isoDateString,
        price: parseFloat(this.eventForm.value.price),
        place: this.eventForm.value.place as string,
        tour_id: this.eventForm.value.tourId,
        amount_of_places: parseInt(this.eventForm.value.amountOfPlaces) as number,
      };

      try {
        const response = await fetch(`${this.toursService.BASE_URL}/provider/tour-event`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.authService.getToken()!}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(eventData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        await response.json();
        this.eventForm.reset();
        this.eventCreateSuccess.set(true);
        setTimeout(() => this.eventCreateSuccess.set(false), 1000);
      } catch (error) {
        console.error('Error:', error);
        alert(`Error creating event: ${error instanceof Error ? error.message : String(error)}`);
      }
    } else {
      alert('Please fill all fields correctly');
    }
  }
}
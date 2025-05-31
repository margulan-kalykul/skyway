import { Component, Input, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CommonModule } from '@angular/common';
import { TourEvent, Tour } from '../../models/interfaces';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tour-itself-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tour-itself-details.component.html',
  styleUrl: './tour-itself-details.component.css'
})
export class TourItselfDetailsComponent implements OnInit {
  @Input() tourId: string = '';
  tour: Tour | null = null;
  tourEvents: TourEvent[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  imageNames = {
      favorite: "assets/images/heart-icon.svg",
      share: "assets/images/share-icon.svg",
      star: "assets/images/rate-star.svg",
      tourImage: "assets/images/tour-example-1.png",  // Change
      calendarIcon: "assets/images/calendar.svg",
  };
  constructor(private toursService: ToursService, private router: Router) {}

  ngOnInit() {
    if (this.tourId) {
      this.loadTourData();
    }
  }

  loadTourData() {
    this.isLoading = true;
    this.error = null;
    
    // Load tour details
    this.toursService.getTourById(this.tourId).subscribe({
      next: (tour) => {
        this.tour = tour;

        this.updateTourImage();

        // Then load tour events
        this.loadTourEvents();
      },
      error: (err) => {
        this.error = 'Failed to load tour details';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  updateTourImage() {
  const tourImages = this.tour?.tour_images;
  if (tourImages && tourImages.length > 0 && tourImages[0].image_url) {
    const imageURL = tourImages[0].image_url;
    this.imageNames.tourImage = imageURL.startsWith('http')
      ? imageURL
      : `http://localhost:8000${imageURL.replace('./','/')}`;
  }
  }

  navigateToTourDetails(tourId: number) {
    this.router.navigate(['/tours', tourId]);
  }
  loadTourEvents() {
    this.toursService.getTourEventsByTourId(this.tourId).subscribe({
      next: (events) => {
        this.tourEvents = events;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tour events';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  formatDate(dateString: string): any {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
}
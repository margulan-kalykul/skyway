import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tour, TourEvent } from '../../models/interfaces';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-user-tours',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './user-tours.component.html',
  styleUrl: './user-tours.component.css'
})
export class UserToursComponent implements OnChanges {
  @Input() tourEvents?: TourEvent[];
  @Input() tours?: Tour[];
  defaultImages = {
    cardImage: "assets/images/image-not-found.png",
  };
  imageNames = {
    calendarIcon: "assets/images/calendar-icon-small.svg",
  };
  showTypes = {
    tourEvent: "tourEvent",
    tour: "tour",
  };
  cardType = this.showTypes.tourEvent;

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newTours = changes['tours']?.currentValue;

    if (Array.isArray(newTours) && newTours.length > 0) {
      this.cardType = this.showTypes.tour;
      const BASE_IMAGE_URL = "http://localhost:8000/v1/tours/"
      for (let i = 0; i < this.tours!.length; i++) {
        let url = this.tours![i].tour_images[0].image_url;
        let relative_path = url.substring(url.indexOf("uploads"));
        let full_path = BASE_IMAGE_URL + relative_path;
        this.tours![i].tour_images[0].image_url = full_path;
      }
    }
  }

  seeDetails(tourId: string): void {
    this.router.navigate(['/tours', tourId]);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { TourEvent } from '../../models/interfaces';
import { Router } from '@angular/router';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css'
})
export class TourCardComponent implements OnInit {
  defaultImages = {
    cardImage: "assets/images/tour-example-1.png",   
  };
  imageNames = {
    favorite: "assets/images/heart-icon.svg",
    cardImage: this.defaultImages.cardImage,
    heartFilled: "assets/images/heart-icon-filled.svg",
  };
  @Input() tourEvent: TourEvent = {
    ID: '',
    amount: 0,
    date: '',
    insta_post_url: '',
    is_opened: false,
    place: '',
    price: 0,
    purchases: [],
    Tour: null,
    tour_id: '',
    tour_image_url: ''
  };
  @Input() userId!: number | null;
  @Input() favTourIds!: string[];
  ellipsedDesc: string = '';
  favButton = this.imageNames.favorite;
  formattedDate = '';

  constructor(private router: Router, private toursService: ToursService) {
    if (this.userId != null && this.tourEvent.tour_id in this.favTourIds) {
      this.favButton = this.imageNames.heartFilled;
    }
  }

ngOnInit(): void {
  const tourImages = this.tourEvent.Tour?.tour_images;

  if (tourImages && tourImages.length > 0 && tourImages[0].image_url) {
    const imageUrl = tourImages[0].image_url;
    this.imageNames.cardImage = imageUrl.startsWith('http')
      ? imageUrl
      : `http://localhost:8000${imageUrl.replace('./', '/')}`;
  } else {
    this.imageNames.cardImage = this.defaultImages.cardImage;
  }

  if (this.tourEvent.date) {
    const date = new Date(this.tourEvent.date);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    this.formattedDate = date.toLocaleDateString('en-US', options);
  }
}

  favoritesClicked(): void {
    if (this.userId != null) {
       
      this.toursService.likeTour(this.tourEvent.tour_id);
      this.favButton = this.imageNames.heartFilled;
    }
    else {
      this.router.navigate(['/sign-in']);
    }
  }

  seeDetails(): void {
    this.router.navigate(['/tours', this.tourEvent.ID]);
  }
}

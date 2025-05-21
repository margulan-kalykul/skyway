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
    cardImage: "assets/images/tour-example-1.png",  // TODO: Download correct default image
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
    tour_id: ''
  };
  @Input() userId!: number | null;
  @Input() favTourIds!: string[];
  ellipsedDesc: string = '';
  favButton = this.imageNames.favorite;

  constructor(private router: Router, private toursService: ToursService) {
    if (this.userId != null && this.tourEvent.tour_id in this.favTourIds) {
      this.favButton = this.imageNames.heartFilled;
    }
  }

  ngOnInit(): void {
    this.imageNames.cardImage = this.tourEvent.Tour!.tour_images ? this.tourEvent.Tour!.tour_images[0].image_url : this.defaultImages.cardImage;
    // Default value
    this.ellipsedDesc = this.tourEvent.Tour!.description;
  }

  favoritesClicked(): void {
    if (this.userId != null) {
      // this.router.navigate(['/user', this.userId, 'favorites']);
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

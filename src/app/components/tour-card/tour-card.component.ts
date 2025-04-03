import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../../models/interfaces';
import { Router } from '@angular/router';

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
  };
  @Input() tour: Tour = {
    id: '',
    description: '',
    owner_id: '',
    route: '',
    tour_categories: null,
    tour_events: null,
    tour_images: null,
    tour_location: null,
    tour_videos: null
  };
  @Input() userId!: number | null;
  ellipsedDesc: string;

  constructor(private router: Router) {
    this.imageNames.cardImage = this.tour.tour_images ? this.tour.tour_images[0].image_url : this.defaultImages.cardImage;
    // Default value
    this.ellipsedDesc = this.tour.description;
  }

  ngOnInit(): void {
    this.tour.description = 'TOP natural landmarks of Almaty - Charyn Canyon, Black and Moon Canyons, Kolsay and Kaindy Lakes';
    this.ellipsedDesc = '';
    this.tour.description.replaceAll('\n', ' ');
    let words = this.tour.description.split(' ');
    let letters = 0, lines = 0, limit = 36;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (lines == 2) {
        limit = 31;
      }
      if (lines == 3) {
        this.ellipsedDesc += '...';
      }
      else {
        this.ellipsedDesc += word + ' ';
      }
      if (letters + word.length >= limit) {
        lines++;
        letters = 0;
      }
      else {
        letters += word.length;
      }
    }
  }

  favoritesClicked(): void {
    if (this.userId != null) {
      this.router.navigate(['/user', this.userId, 'favorites']);
    }
    else {
      this.router.navigate(['/sign-in']);
    }
  }

  seeDetails(tourId: string): void {
    this.router.navigate(['/tours', tourId]);
  }
}

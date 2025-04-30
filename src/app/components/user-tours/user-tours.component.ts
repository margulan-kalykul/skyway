import {Component, Input, OnInit} from '@angular/core';
import { Tour, TourEvent } from '../../models/interfaces';
import { Router } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-user-tours',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './user-tours.component.html',
  styleUrl: './user-tours.component.css'
})
export class UserToursComponent implements OnInit {
  @Input() tourEvents?: TourEvent[];
  defaultImages = {
    cardImage: "assets/images/image-not-found.png",
  };
  imageNames = {
    calendarIcon: "assets/images/calendar-icon-small.svg",
  };

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

    seeDetails(tourId: string): void {
    this.router.navigate(['/tours', tourId]);
  }
}

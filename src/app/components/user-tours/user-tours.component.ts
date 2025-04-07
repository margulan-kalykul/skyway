import { Component, Input } from '@angular/core';
import { Tour } from '../../models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-tours',
  standalone: true,
  imports: [],
  templateUrl: './user-tours.component.html',
  styleUrl: './user-tours.component.css'
})
export class UserToursComponent {
  @Input() tours!: Tour[];
  defaultImages = {
    cardImage: "assets/images/tour-example-1.png",  // TODO: Download correct default image
  };
  imageNames = {
    calendarIcon: "assets/images/calendar-icon-small.svg",
  };

  constructor(private router: Router) {}

  seeDetails(tourId: string): void {
    this.router.navigate(['/tours', tourId]);
  }
}

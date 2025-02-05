import { Component, Input } from '@angular/core';
import { Tour } from '../models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css'
})
export class TourCardComponent {
  @Input() tour!: Tour;

  constructor(private router: Router) {}

  seeDetails(tourId: number): void {
    this.router.navigate(['/tours', tourId]);
  }
}

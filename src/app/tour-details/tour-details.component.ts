import { Component, OnInit } from '@angular/core';
import { Tour } from '../models/interfaces';
import { ToursService } from '../services/tours.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.css'
})
export class TourDetailsComponent implements OnInit {
  tour: Tour;

  constructor (private toursService: ToursService, private router: ActivatedRoute) {
    this.tour = {} as Tour;
  }

  ngOnInit(): void {
    let id = Number(this.router.snapshot.paramMap.get('tourId'));
    this.getTour(id);
  }

  getTour(tourId: number): void {
    this.toursService.getTourById(tourId).subscribe((tour) => {
      this.tour = tour; // TODO: Fetch from the dedicated endpoint
    })
  }

}

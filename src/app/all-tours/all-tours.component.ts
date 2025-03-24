import { Component, OnInit } from '@angular/core';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { ToursService } from '../services/tours.service';
import { Tour, TourOld } from '../models/interfaces';

@Component({
  selector: 'app-all-tours',
  standalone: true,
  imports: [TourCardComponent],
  templateUrl: './all-tours.component.html',
  styleUrl: './all-tours.component.css'
})
export class AllToursComponent implements OnInit {
  // tours: TourOld[][];
  tours: Tour[];
  hiddenTours: Tour[];
  headers_list: string[];

  constructor(private toursService: ToursService) {
    this.tours = [];
    this.hiddenTours = [];
    this.headers_list = [];
  }

  ngOnInit(): void {
    this.getTours();
    if (this.tours.length > 6) {
      this.hiddenTours = this.tours.slice(6);
      this.tours = this.tours.slice(0, 6);
    }
    // this.getHeaders();
  }

  getTours(): void {
    // this.toursService.getToursWithHeaders().subscribe((toursWithHeaders) => {
    //   this.tours = toursWithHeaders;
    // })
    this.tours = [
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
    ];
  }

  getHeaders(): void {
    this.toursService.getHeaders().subscribe((headers) => {
      this.headers_list = headers;
    })
  }
}

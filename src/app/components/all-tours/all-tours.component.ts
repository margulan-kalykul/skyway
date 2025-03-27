import { Component, OnInit } from '@angular/core';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { ToursService } from '../../services/tours.service';
import { Tour } from '../../models/interfaces';

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
  multiTours: Tour[];
  headers_list: string[];
  currentPart = 0;
  isRightArrowShown = true;
  isLeftArrowShown = false;

  constructor(private toursService: ToursService) {
    this.tours = [];
    this.hiddenTours = [];
    this.multiTours = [];
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

  expandTours(): void {
    this.tours = this.tours.concat(this.hiddenTours.slice(0, 6));
    this.hiddenTours = this.hiddenTours.slice(6);
  }

  nextMultiTours(): void {
    if (this.currentPart < this.multiTours.length-4) {
      this.currentPart++;
    }
    if (this.currentPart === this.multiTours.length-4) {
      this.isRightArrowShown = false;
    }
    else {
      this.isRightArrowShown = true;
    }
    if (this.currentPart === 0) {
      this.isLeftArrowShown = false;
    }
    else { 
      this.isLeftArrowShown = true;
    }
  }

  prevMultiTours(): void {
    if (this.currentPart > 0) {
      this.currentPart--;
    }
    if (this.currentPart === 0) {
      this.isLeftArrowShown = false;
    }
    else { 
      this.isLeftArrowShown = true;
    }
    if (this.currentPart === this.multiTours.length-4) {
      this.isRightArrowShown = false;
    }
    else {
      this.isRightArrowShown = true;
    }
  }

  getTours(): void {
    // this.toursService.getToursWithHeaders().subscribe((toursWithHeaders) => {
    //   this.tours = toursWithHeaders;
    // })
    this.tours = [
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route2', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route3', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route4', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route5', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route6', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route7', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route8', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route9', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
      {id: '1', description: 'Desc1', owner_id: '1', route: 'Route10', tour_categories: null, tour_events: null, tour_images: null, tour_location: null, tour_videos: null},
    ];
    this.multiTours = [
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

import { Component } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { Tour } from '../../models/interfaces';

@Component({
  selector: 'app-top-destinations',
  standalone: true,
  imports: [],
  templateUrl: './top-destinations.component.html',
  styleUrl: './top-destinations.component.css'
})
export class TopDestinationsComponent {
  destinations: Tour[];
  headers_list: string[];
  currentPart = 0;
  isRightArrowShown = true;
  isLeftArrowShown = false;

  constructor(private toursService: ToursService) {
    this.destinations = [];
    this.headers_list = [];
  }

  ngOnInit(): void {
    this.getTours();
    // this.getHeaders();
  }

  nextMultiTours(): void {
    if (this.currentPart < this.destinations.length-4) {
      this.currentPart++;
    }
    if (this.currentPart === this.destinations.length-4) {
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
    if (this.currentPart === this.destinations.length-4) {
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
    this.destinations = [
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
      {ID: '1', description: 'Desc1', name: 'name1', telegram_chat_url: '', tour_panoramas: null, tour_user_favorites: null, owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [], tour_location: null, tour_videos: null},
    ];
  }
}

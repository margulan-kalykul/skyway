import { Component, Input, OnInit } from '@angular/core';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { ToursService } from '../../services/tours.service';
import { Tour, TourEvent } from '../../models/interfaces';

@Component({
  selector: 'app-all-tours',
  standalone: true,
  imports: [TourCardComponent],
  templateUrl: './all-tours.component.html',
  styleUrl: './all-tours.component.css'
})
export class AllToursComponent implements OnInit {
  tourEvents: TourEvent[] = [];
  hiddenTours: TourEvent[] = [];
  multiTours: Tour[] = [];
  currentPart = 0;
  isRightArrowShown = true;
  isLeftArrowShown = false;
  @Input() userId!: number | null;

  constructor(private toursService: ToursService) {
  }

  ngOnInit(): void {
    this.showTours();
  }

  expandTours(): void {
    this.tourEvents = this.tourEvents.concat(this.hiddenTours.slice(0, 6));
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

  showTours(): void {
    this.toursService.getAllTourEvents().subscribe((tourEvents) => {
      this.tourEvents = tourEvents;
      if (this.tourEvents.length > 6) {
        this.hiddenTours = this.tourEvents.slice(6);
        this.tourEvents = this.tourEvents.slice(0, 6);
      }
    });
    this.multiTours = [
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

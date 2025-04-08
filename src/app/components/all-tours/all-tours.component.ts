import { Component, Input, OnInit } from '@angular/core';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { ToursService } from '../../services/tours.service';
import { Category, Tour, TourEvent } from '../../models/interfaces';

@Component({
  selector: 'app-all-tours',
  standalone: true,
  imports: [TourCardComponent],
  templateUrl: './all-tours.component.html',
  styleUrl: './all-tours.component.css'
})
export class AllToursComponent implements OnInit {
  imageNames = {
    search: "assets/images/search.svg",
  };
  maxSeenTours = 12;
  tourEvents: TourEvent[] = [];
  hiddenTours: TourEvent[] = [];
  multiTours: Tour[] = [];
  currentPart = 0;
  isRightArrowShown = true;
  isLeftArrowShown = false;
  @Input() userId!: number | null;
  days = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3];
  weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S'];
  blackDay = 3;
  categories: Category[] = [];
  selectedCategory = 0;
  
  constructor(private toursService: ToursService) {
  }

  ngOnInit(): void {
    this.showTours();
    this.toursService.getCategories().subscribe((categories) => {
      this.categories = categories.Categories;
      console.log(this.categories);
    });
  }

  expandTours(): void {
    this.tourEvents = this.tourEvents.concat(this.hiddenTours.slice(0, this.maxSeenTours));
    this.hiddenTours = this.hiddenTours.slice(this.maxSeenTours);
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
      if (this.tourEvents.length > this.maxSeenTours) {
        this.hiddenTours = this.tourEvents.slice(this.maxSeenTours);
        this.tourEvents = this.tourEvents.slice(0, this.maxSeenTours);
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

import { Component, Input, OnInit } from '@angular/core';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { ToursService } from '../../services/tours.service';
import { Category, Tour, TourEvent, TourSearchResults } from '../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-tours',
  standalone: true,
  imports: [CommonModule, TourCardComponent, FormsModule],
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
  @Input() favTourIds!: string[];
  days = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3];
  weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S'];
  blackDay = 3;
  categories: Category[] = [];
  selectedCategories: string[] = [];
  selectedCategory = 0;
  defaultImageUrl = 'assets/images/simple-tour-card-example-1.png';

  searchQuery = '';
  searchResults: TourSearchResults[] = [];
  showDropdown = false;

  constructor(private toursService: ToursService) {
  }

  ngOnInit(): void {
    this.showTours();
    this.toursService.getCategories().subscribe((categories) => {
      this.categories = categories.Categories;
    });
  }

 fetchSearchResults(query: string): void {
    if (!query.trim()) {
      this.searchResults = [];
      this.showDropdown = false;
      return;
    }

    this.toursService.searchTours(query).subscribe({
      next: (response) => {
        this.searchResults = response.Results;
        this.showDropdown = this.searchResults.length > 0;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.searchResults = [];
        this.showDropdown = false;
      }
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
    if (this.selectedCategories.length === 0) {
      this.toursService.getAllTourEvents().subscribe((tourEvents) => {
        this.processTourEvents(tourEvents);
      });
    } else {
      this.toursService.getTourEventsByCategories(this.selectedCategories).subscribe((tourEvents) => {
        this.processTourEvents(tourEvents);
      });
    }
  }  

  private processTourEvents(tourEvents: TourEvent[]): void {
    this.tourEvents = tourEvents;
    if (this.tourEvents.length > this.maxSeenTours) {
      this.hiddenTours = this.tourEvents.slice(this.maxSeenTours);
      this.tourEvents = this.tourEvents.slice(0, this.maxSeenTours);
    } else {
      this.hiddenTours = [];
    }
  }

  toggleCategorySelection(categoryId: string): void {
    const index = this.selectedCategories.indexOf(categoryId);
    
    if (index === -1) {
      // Add to selection if not already selected
      this.selectedCategories.push(categoryId);
    } else {
      // Remove from selection if already selected
      this.selectedCategories.splice(index, 1);
    }
    
    // Refresh tours with new filter
    this.showTours();
  }
  isCategorySelected(categoryId: string): boolean {
    return this.selectedCategories.includes(categoryId);
  }
  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.showDropdown = false;
  }
  

}

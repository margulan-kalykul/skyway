import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Purchase, Tour, TourEvent } from '../../models/interfaces';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-user-tours',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './user-tours.component.html',
  styleUrl: './user-tours.component.css'
})
export class UserToursComponent implements OnChanges {
  tourEvents?: Purchase[];
  @Input() tours?: Tour[];
  defaultImages = {   
    cardImage: "assets/images/tour-example-2.png",   
  };
  imageNames = {
    favorite: "assets/images/heart-icon.svg",
    cardImage: this.defaultImages.cardImage,
    heartFilled: "assets/images/heart-icon-filled.svg",
    calendarIcon: "assets/images/calendar-icon-small.svg",
    qrIcon: "assets/images/qr-code.svg"
  };
  
  
  showTypes = {
    tourEvent: "tourEvent",
    tour: "tour",
  };
  @Input() cardType: string = this.showTypes.tourEvent

  
  showQRModal = false;
  selectedTourEvent: Purchase | null = null;
  qrCodeImage: string | null = null;
  constructor(private router: Router, private toursService: ToursService) {}

  ngOnInit(): void {
    this.toursService.getUserInfo().subscribe((userInfo) => {
      this.tourEvents = userInfo.PurchasedTourEvents;
      console.log(this.tourEvents);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  getTourImageUrl(tourEvent: Purchase): string {
      if (!tourEvent?.TourEvent?.Tour?.tour_images?.[0]?.image_url) {
    return this.defaultImages.cardImage;
  }
    return `http://localhost:8000${tourEvent?.TourEvent?.Tour?.tour_images?.[0]?.image_url.replace('./','/')}` || this.defaultImages.cardImage;
  }

  getTourImage(tour: Tour): string {
    return `http://localhost:8000${tour?.tour_images?.[0]?.image_url.replace('./','/') || this.defaultImages.cardImage.replace('./','/')}` || this.defaultImages.cardImage;

  }

  seeDetails(tourId: string): void {
    this.router.navigate(['/tours', tourId]);
  }

  formatDate(dateString: string): string {
    if (dateString) {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'long', 
      };
      dateString = date.toLocaleDateString('en-US', options);
      return dateString
    }
    return ''
  }

    showQRCode(tourEvent: Purchase): void {
    this.selectedTourEvent = tourEvent;
    this.showQRModal = true;
    this.qrCodeImage = null;
    
     
    this.toursService.getPurchaseQRCode(tourEvent.ID).subscribe({
      next: (response: any) => {
        this.qrCodeImage = response.qr_code;
      },
      error: (error) => {
        console.error('Error fetching QR code:', error);
      }
    });
  }

  closeQRModal(): void {
    this.showQRModal = false;
    this.selectedTourEvent = null;
    this.qrCodeImage = null;
  }
}
import { Component, OnInit } from '@angular/core';
import { AllToursComponent } from '../../components/all-tours/all-tours.component';
import { DeviceService } from '../../services/device.service';
import { DeviceInfo } from '../../models/device-info';
import { TopOfPageComponent } from "../../components/top-of-page/top-of-page.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ShortSearchComponent } from "../../components/short-search/short-search.component";
import { TopDestinationsComponent } from "../../components/top-destinations/top-destinations.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { ToursService } from '../../services/tours.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [AllToursComponent, TopOfPageComponent, HeaderComponent, 
             ShortSearchComponent, TopDestinationsComponent, FooterComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  imageNames = {
    instagramIcon: "assets/images/instagram-icon.svg",
    reviews: "assets/images/reviews.svg",
  }
  
  galleryImages = [
    "assets/images/gallery1.png",
    "assets/images/gallery2.png",
    "assets/images/gallery3.png",
    "assets/images/gallery4.png",
    "assets/images/gallery5.png",
    "assets/images/gallery6.png",
    "assets/images/gallery7.png",
    "assets/images/gallery8.png"
  ];
  
  deviceInfo: DeviceInfo;
  userData: any;
  favTourIds: string[] = [];
  showImageModal = false;
  selectedImageIndex = 0;

  constructor(deviceService: DeviceService, private authService: AuthService, private toursService: ToursService) {
    this.deviceInfo = deviceService.getClientInfo();
    console.log('Client Info:', this.deviceInfo);
    this.getUserData();
    if (this.userData.username != null && this.userData.userId != null) {
      this.toursService.getUserInfo().subscribe((userMe) => {
        for (let i = 0; i < userMe.FavoriteTours.length; i++) {
          let fav = userMe.FavoriteTours[i].tour_id;
          this.favTourIds.push(fav);
        }
      });
    }
  }

  ngOnInit(): void {}

  getUserData(): void {
    this.userData = this.authService.getUserData();
  }

  openImageModal(index: number = 0): void {
    this.selectedImageIndex = index;
    this.showImageModal = true;
    document.body.style.overflow = 'hidden';  
  }

  closeImageModal(): void {
    this.showImageModal = false;
    document.body.style.overflow = 'auto';  
  }

  navigateImage(direction: 'prev' | 'next'): void {
    if (direction === 'prev') {
      this.selectedImageIndex = (this.selectedImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
    } else {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.galleryImages.length;
    }
  }
}
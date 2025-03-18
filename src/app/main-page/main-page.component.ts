import { Component, OnInit } from '@angular/core';
import { TourScheduleComponent } from '../tour-schedule/tour-schedule.component';
import { AllToursComponent } from '../all-tours/all-tours.component';
import { Router, RouterLink } from '@angular/router';
import { DeviceService } from '../services/device.service';
import { DeviceInfo } from '../models/device-info';
import { TopOfPageComponent } from "../top-of-page/top-of-page.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TourScheduleComponent, AllToursComponent, TopOfPageComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  imageNames = {
    bookTourSteps: "assets/images/book-tour-steps.png",  // Image showing steps of how to book a tour
    aboutUsImage1: "assets/images/Diamond.svg",  // Image of the diamond for the About us part
    aboutUsImage2: "assets/images/Business Handshake.svg",  // Image of the handshake for the About us part
    aboutUsImage3: "assets/images/Coin Share.svg",  // Image of the hand receiving a coin for the About us part
    weAreInNumbers: "assets/images/numbers-background.png",  // Image of the We are in numbers part
    instagramIcon: "assets/images/instagram-icon.svg",  // Instagram icon
    reviews: "assets/images/reviews.svg",  // Image of reviews
    footerEmblem: "assets/images/footer-emblem.png",  // Emblem at the footer
    tripAdvisorAward: "assets/images/trip-advisor-award.png",  // Icon showing TripAdvisor's Travelers' Choice award
    whatsapp: "assets/images/whatsapp.png",
    telegram: "assets/images/telegram.png",
    instagram: "assets/images/instagram.png",
    facebook: "assets/images/facebook.png",
    youtube: "assets/images/youtube.png",
  }
  deviceInfo: DeviceInfo;

  constructor(deviceService: DeviceService) {
    this.deviceInfo = deviceService.getClientInfo();
    console.log('Client Info:', this.deviceInfo);
  }

  ngOnInit(): void {
    let topOfPage = document.getElementById("top-of-page");
    console.log(topOfPage);
    if (topOfPage != null) {
      topOfPage.style.width = `${this.deviceInfo.viewScreen.width}px`;
      // topOfPage.style.height = `${this.deviceInfo.viewScreen.height}px`;
      console.log(`${topOfPage.style.width} ${topOfPage.style.height} something`);
    }
  }
}

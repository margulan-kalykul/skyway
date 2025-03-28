import { Component, OnInit } from '@angular/core';
import { TourScheduleComponent } from '../../components/tour-schedule/tour-schedule.component';
import { AllToursComponent } from '../../components/all-tours/all-tours.component';
import { Router, RouterLink } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { DeviceInfo } from '../../models/device-info';
import { TopOfPageComponent } from "../../components/top-of-page/top-of-page.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ShortSearchComponent } from "../../components/short-search/short-search.component";
import { TopDestinationsComponent } from "../../components/top-destinations/top-destinations.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TourScheduleComponent, AllToursComponent, TopOfPageComponent, HeaderComponent, ShortSearchComponent, TopDestinationsComponent, FooterComponent],
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
  }
  deviceInfo: DeviceInfo;
  userData: any;

  constructor(deviceService: DeviceService, private authService: AuthService) {
    this.deviceInfo = deviceService.getClientInfo();
    console.log('Client Info:', this.deviceInfo);
  }

  ngOnInit(): void {
    this.getUserData();
    // let topOfPage = document.getElementById("top-of-page");
    // console.log(topOfPage);
    // if (topOfPage != null) {
    //   topOfPage.style.width = `${this.deviceInfo.viewScreen.width}px`;
    //   // topOfPage.style.height = `${this.deviceInfo.viewScreen.height}px`;
    //   console.log(`${topOfPage.style.width} ${topOfPage.style.height} something`);
    // }
  }

  getUserData(): void {
    this.userData = this.authService.getUserData();
  }
}

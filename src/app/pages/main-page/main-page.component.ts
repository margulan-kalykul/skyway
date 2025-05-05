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

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [AllToursComponent, TopOfPageComponent, HeaderComponent, ShortSearchComponent, TopDestinationsComponent, FooterComponent],
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
  favTourIds: string[] = [];

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

  ngOnInit(): void {
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

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

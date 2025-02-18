import { Component } from '@angular/core';
import { TourScheduleComponent } from '../tour-schedule/tour-schedule.component';
import { AllToursComponent } from '../all-tours/all-tours.component';
import { Router, RouterLink } from '@angular/router';
import { DeviceService } from '../services/device.service';
import { DeviceInfo } from '../models/device-info';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TourScheduleComponent, AllToursComponent, RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  deviceInfo: DeviceInfo;

  constructor(private router: Router, deviceService: DeviceService) {
    this.deviceInfo = deviceService.getClientInfo();
    console.log('Client Info:', this.deviceInfo);
  }

  sign_in(): void {
    this.router.navigate(['/sign-in']);
  }
}

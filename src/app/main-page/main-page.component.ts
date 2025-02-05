import { Component } from '@angular/core';
import { TourScheduleComponent } from '../tour-schedule/tour-schedule.component';
import { AllToursComponent } from '../all-tours/all-tours.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TourScheduleComponent, AllToursComponent, RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  constructor(private router: Router) {}

  sign_in(): void {
    this.router.navigate(['/sign-in']);
  }
}

import { Component } from '@angular/core';
import { TourScheduleComponent } from '../tour-schedule/tour-schedule.component';
import { AllToursComponent } from '../all-tours/all-tours.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TourScheduleComponent, AllToursComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}

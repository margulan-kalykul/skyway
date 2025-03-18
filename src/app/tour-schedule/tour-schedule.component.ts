import { Component } from '@angular/core';

@Component({
  selector: 'app-tour-schedule',
  standalone: true,
  imports: [],
  templateUrl: './tour-schedule.component.html',
  styleUrl: './tour-schedule.component.css'
})
export class TourScheduleComponent {
  imageNames = {
    dropDownArrow: "assets/images/drop-down-arrow.svg",
    explanation: "assets/images/tours-explanation.png",
  };
}

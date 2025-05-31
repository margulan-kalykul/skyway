// tour-schedule.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { TourItselfDetailsComponent } from '../../components/tour-itself-details/tour-itself-details.component';

@Component({
  selector: 'app-tour-schedule',
  standalone: true,
  imports: [HeaderComponent, TourItselfDetailsComponent],
  templateUrl: './tour-schedule.component.html',
  styleUrls: ['./tour-schedule.component.css']
})
export class TourScheduleComponent implements OnInit {
  tourId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tourId = params['id'];
    });
  }
}
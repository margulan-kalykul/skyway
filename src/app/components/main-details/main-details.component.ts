import { Component, OnInit } from '@angular/core';
import { WeatherInfo } from '../../models/interfaces';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-details',
  standalone: true,
  imports: [],
  templateUrl: './main-details.component.html',
  styleUrl: './main-details.component.css'
})
export class MainDetailsComponent implements OnInit {
  imageNames = {
    favorite: "assets/images/heart-icon.svg",
    share: "assets/images/share-icon.svg",
    star: "assets/images/rate-star.svg",
    tourImage: "assets/images/tour-example-1.png",  // Change
    calendarIcon: "assets/images/calendar.svg",
  };
  weather: WeatherInfo = {
    condition: {
      code: 0,
      icon: 'assets/images/sun.svg',
      text: ''
    },
    temp_c: 0,
    temp_f: 0,
    wind_dir: '',
    wind_kph: 0,
    wind_mph: 0
  };
  tourEventId: string | null = null;

  constructor(private activatedRouter: ActivatedRoute, private toursService: ToursService) {
    this.activatedRouter.paramMap.subscribe(params => {
      this.tourEventId = params.get('tourId');
    });
  }

  ngOnInit(): void {
    this.toursService.getWeather(this.tourEventId!).subscribe(weatherInfo => {
      if (weatherInfo != null) {
        this.weather = weatherInfo;
      }
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import {Tour, TourEvent, WeatherInfo} from '../../models/interfaces';
import { ToursService } from '../../services/tours.service';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-main-details',
    standalone: true,
    imports: [NgIf],
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
    @Input() tourEventId!: string;
    tourEvent: TourEvent | null = null;
    tourDate: Date | null = null;
    today: string | null = null;
    weatherDate: string | null = null;
    daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    constructor(private toursService: ToursService) {  }

    ngOnInit(): void {
        this.toursService.getTourEventById(this.tourEventId).subscribe(tourEvent => {
            this.tourEvent = tourEvent;
            this.tourDate = new Date(this.tourEvent.date);
            this.today = `${this.months[this.tourDate.getMonth()]} ${this.tourDate.getDate()}, ${this.tourDate.getFullYear()}`;
            this.weatherDate = `${this.daysOfWeek[this.tourDate.getDay()]}, ${this.tourDate.getDate()} ${this.months[this.tourDate.getMonth()]}`;

            this.toursService.getTourById(this.tourEvent.tour_id).subscribe(tour => {
                this.tourEvent!.Tour = tour;
                let url = this.tourEvent!.Tour.tour_images[0].image_url;
                let relative_path = url.substring(url.indexOf("uploads"));
                let full_path = "http://localhost:8000/v1/tours/" + relative_path;
                this.tourEvent!.Tour.tour_images[0].image_url = full_path;
                this.imageNames.tourImage = full_path;
            })
        })
        this.toursService.getWeather(this.tourEventId!).subscribe(weatherInfo => {
            if (weatherInfo != null) {
                this.weather = weatherInfo;
            }
        });
    }
}

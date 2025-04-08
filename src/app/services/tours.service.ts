import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Tour, TourEvent, WeatherInfo } from '../models/interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  // BASE_URL = 'https://690bdb6e-fe5f-4a85-a24b-6df9a324b136.mock.pstmn.io';
  BASE_URL = 'http://localhost:8000/v1';
  httpOptions = {};

  constructor(private http: HttpClient, private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getToken()!}`
        })
      };
    }
  }

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.BASE_URL}/tours/`, this.httpOptions);
  }

  getTourById(tourId: string): Observable<Tour> {
    return this.http.get<Tour>(`${this.BASE_URL}/tours/${tourId}/`, this.httpOptions);
  }

  getAllTourEvents(): Observable<TourEvent[]> {
    return this.http.get<TourEvent[]>(`${this.BASE_URL}/tours/tour-events/`, this.httpOptions);
  }

  getTourEventById(tourEventId: string): Observable<TourEvent> {
    return this.http.get<TourEvent>(`${this.BASE_URL}/tours/tour-events/${tourEventId}/`, this.httpOptions);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/tours/categories/`, this.httpOptions);
  }

  getWeather(tourEventId: string): Observable<WeatherInfo> {
    return this.http.get<WeatherInfo>(`${this.BASE_URL}/tours/tour-events/${tourEventId}/weather/`, this.httpOptions);
  }
}

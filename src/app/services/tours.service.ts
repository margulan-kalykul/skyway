import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, LikeTourDTO, PaymentIntent, Tour, TourEvent, UserData, WeatherInfo } from '../models/interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  // BASE_URL = 'https://690bdb6e-fe5f-4a85-a24b-6df9a324b136.mock.pstmn.io';
  BASE_URL = 'http://localhost:8000/v1/tours';
  httpOptions = {};

  constructor(private http: HttpClient, private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getToken()!}`
        }),
        withCredentials: true,
      };
    }
  }

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.BASE_URL}/`, this.httpOptions);
  }

  getTourById(tourId: string): Observable<Tour> {
    return this.http.get<Tour>(`${this.BASE_URL}/${tourId}/`, this.httpOptions);
  }

  getAllTourEvents(): Observable<TourEvent[]> {
    return this.http.get<TourEvent[]>(`${this.BASE_URL}/tour-events/`, this.httpOptions);
  }

  getTourEventById(tourEventId: string): Observable<TourEvent> {
    return this.http.get<TourEvent>(`${this.BASE_URL}/tour-events/${tourEventId}/`, this.httpOptions);
  }

  getUserInfo(): Observable<UserData> {
    return this.http.get<UserData>(`${this.BASE_URL}/users/me/`, this.httpOptions);
  }

  likeTour(tour_id: string): void {
    this.http.post(`${this.BASE_URL}/users/like/`, {tour_id: tour_id} as LikeTourDTO, this.httpOptions).subscribe();
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/categories/`, this.httpOptions);
  }

  getWeather(tourEventId: string): Observable<WeatherInfo> {
    return this.http.get<WeatherInfo>(`${this.BASE_URL}/tour-events/${tourEventId}/weather/`, this.httpOptions);
  }

  getPaymentIntent(): Observable<PaymentIntent> {
    // TODO: Use httpOptions in the real one
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // TODO: add body to request
    // let body = {
    //   amount: 
    // }
    return this.http.post(`https://690bdb6e-fe5f-4a85-a24b-6df9a324b136.mock.pstmn.io/payment/create-payment-intent/`, null, options) as Observable<PaymentIntent>;
    // return this.http.post(`${this.BASE_URL}/payment/create-payment-intent/`, null, this.httpOptions) as Observable<PaymentIntent>;
  }
}

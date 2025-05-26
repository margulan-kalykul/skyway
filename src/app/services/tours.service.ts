import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, LikeTourDTO, CustomPaymentIntent, Tour, TourEvent, UserData, WeatherInfo } from '../models/interfaces';
import { AuthService } from './auth.service';

@Injectable({
      providedIn: 'root'
})
export class ToursService {
    // BASE_URL = 'https://690bdb6e-fe5f-4a85-a24b-6df9a324b136.mock.pstmn.io';
    BASE_URL = 'http://localhost:8000/v1/tours';

    constructor(private http: HttpClient, private authService: AuthService) {}

    httpOptions(baseOptions: {} = {}): object {
        let options = baseOptions;
        if (this.authService.isLoggedIn()) {
            options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.authService.getToken()!}`,
                }),
                withCredentials: true,
                ...baseOptions,
            };
        }
        else {
            options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
                ...baseOptions,
            };
        }
        return options;
    }

    getAllTours(specialOptions: {} = {}): Observable<Tour[]> {
        return this.http.get<Tour[]>(`${this.BASE_URL}/`, this.httpOptions(specialOptions));
    }

    getTourById(tourId: string, specialOptions: {} = {}): Observable<Tour> {
        return this.http.get<Tour>(`${this.BASE_URL}/${tourId}/`, this.httpOptions(specialOptions));
    }

    getAllTourEvents(specialOptions: {} = {}): Observable<TourEvent[]> {
        return this.http.get<TourEvent[]>(`${this.BASE_URL}/tour-events/`, this.httpOptions(specialOptions));
    }

    getTourEventById(tourEventId: string, specialOptions: {} = {}): Observable<TourEvent> {
        return this.http.get<TourEvent>(`${this.BASE_URL}/tour-events/${tourEventId}/`, this.httpOptions(specialOptions));
    }
    // getTourEventByIdResponse(tourEventId: string, specialOptions: {} = {}): Observable<TourEvent> {
    //     return this.http.get<TourEvent>(`${this.BASE_URL}/tour-events/${tourEventId}/`, this.httpOptions(specialOptions));
    // }

    getUserInfo(specialOptions: {} = {}): Observable<UserData> {
        return this.http.get<UserData>(`${this.BASE_URL}/users/me/`, this.httpOptions(specialOptions));
    }

    likeTour(tour_id: string, specialOptions: {} = {}): void {
        this.http.post(`${this.BASE_URL}/users/like/`, {tour_id: tour_id} as LikeTourDTO, this.httpOptions(specialOptions)).subscribe();
    }

    getCategories(specialOptions: {} = {}): Observable<any> {
        return this.http.get<any>(`${this.BASE_URL}/categories/`, this.httpOptions(specialOptions));
    }

    getWeather(tourEventId: string, specialOptions: {} = {}): Observable<WeatherInfo> {
        return this.http.get<WeatherInfo>(`${this.BASE_URL}/tour-events/${tourEventId}/weather/`, this.httpOptions(specialOptions));
    }
}

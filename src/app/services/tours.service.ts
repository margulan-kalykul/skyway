import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, LikeTourDTO, CustomPaymentIntent, Tour, TourEvent, UserData, WeatherInfo, TourSearchResults } from '../models/interfaces';
import { AuthService } from './auth.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
      providedIn: 'root'
})
export class ToursService {
    // BASE_URL = 'https://690bdb6e-fe5f-4a85-a24b-6df9a324b136.mock.pstmn.io';
    BASE_URL = 'http://localhost:8000/v1/tours';

    constructor(private http: HttpClient, private authService: AuthService) {}

    httpOptions(baseOptions: {} = {}, contentType: string = 'application/json'): object {
        let options = baseOptions;
        if (this.authService.isLoggedIn()) {
            options = {
                headers: new HttpHeaders({
                    'Content-Type': contentType,
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

    getFilePath(localPath: string): string {
        let relative_path = localPath.substring(localPath.indexOf("uploads"));
        return `${this.BASE_URL}/${relative_path}`;
    }

    getAllTours(specialOptions: {} = {}): Observable<Tour[]> {
        return this.http.get<Tour[]>(`${this.BASE_URL}/`, this.httpOptions(specialOptions));
    }

    getTourById(tourId: string, specialOptions: {} = {}): Observable<Tour> {
        return this.http.get<Tour>(`${this.BASE_URL}/${tourId}/`, this.httpOptions(specialOptions));
    }

    getAllTourEvents(startDate?: string | null, endDate?: string | null): Observable<TourEvent[]> {
        let params = new HttpParams();
        
        if (startDate) {
            params = params.append('start_date', startDate);
        }
        if (endDate) {
            params = params.append('end_date', endDate);
        }

        return this.http.get<TourEvent[]>(`${this.BASE_URL}/tour-events/`, {
            params,
            ...this.httpOptions()
        });
    }

    getTourEventById(tourEventId: string, specialOptions: {} = {}): Observable<TourEvent> {
        return this.http.get<TourEvent>(`${this.BASE_URL}/tour-events/${tourEventId}/`, this.httpOptions(specialOptions));
    }

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

    getTourEventsByCategories(categoryIds: string[], startDate?: string | null, endDate?: string | null): Observable<TourEvent[]> {
        let params = new HttpParams({
            fromObject: {
                'category_ids': categoryIds
            }
        });

        if (startDate) {
            params = params.append('start_date', startDate);
        }
        if (endDate) {
            params = params.append('end_date', endDate);
        }

        return this.http.get<TourEvent[]>(`${this.BASE_URL}/tour-events/`, {
            params,
            ...this.httpOptions()
        });
    }




    searchTours(query: string): Observable<{ Results: TourSearchResults[] }> {
        const url = `http://localhost:8000/v1/recommendations/search/${encodeURIComponent(query)}`;
        const params = {
            page: 1,
            size: 5
        };

        return this.http.get<{ Results: TourSearchResults[] }>(url, {
            ...this.httpOptions(),
            params,
        });
    }

    getTourEventsByTourId(tourId: string, specialOptions: {} = {}): Observable<TourEvent[]> {
        return this.http.get<TourEvent[]>(`${this.BASE_URL}/${tourId}/tour-events/`, this.httpOptions(specialOptions));
    }

    payTourEventByID(tourEventID: string, specialOptions: {} = {}): void{
        this.http.post(`${this.BASE_URL}/payment/`, {tour_event_id: tourEventID}, this.httpOptions(specialOptions) ).subscribe();
    }

    getAvatar(specialOptions: {} = {}): Observable<any> {
        return this.http.get<any>(`${this.BASE_URL}/users/avatar/`, this.httpOptions(specialOptions));
    }

    uploadAvatar(formData: FormData, specialOptions: {} = {}): Observable<any> {
        let options = {};
        if (this.authService.isLoggedIn()) {
            options = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${this.authService.getToken()!}`,
                }),
                withCredentials: true,
            };
        }
        else {
            options = {
                headers: new HttpHeaders(),
            };
        }
        return this.http.post(`${this.BASE_URL}/users/avatar/`, formData, options);
    }

    getPurchaseQRCode(purchaseId: string): Observable<any> {
        return this.http.get(`${this.BASE_URL}/users/get-purchase-qr/${purchaseId}`, this.httpOptions());
    }

    createTour(formData: FormData): Observable<any> {
        return this.http.post(`${this.BASE_URL}/provider/`, formData, this.httpOptions({}, 'multipart/form-data'));
    }
}

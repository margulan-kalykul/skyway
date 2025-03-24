import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TourOld } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'https://690bdb6e-fe5f-4a85-a24b-6df9a324b136.mock.pstmn.io';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getTours(): Observable<TourOld[]> {
    return this.http.get<TourOld[]>(`${this.BASE_URL}/getTours/`);
  }

  getToursWithHeaders(): Observable<TourOld[][]> {
    return this.http.get<TourOld[][]>(`${this.BASE_URL}/getToursWithHeaders/`)
  }

  getHeaders(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/headers_list/`);
  }

  getTourById(tourId: number): Observable<TourOld> {
    return this.http.get<TourOld>(`${this.BASE_URL}/getTourById/${tourId}/`);
  }
}

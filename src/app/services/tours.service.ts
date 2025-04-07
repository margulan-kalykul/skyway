import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  // BASE_URL = 'https://690bdb6e-fe5f-4a85-a24b-6df9a324b136.mock.pstmn.io';
  BASE_URL = 'http://localhost:8000/v1';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.BASE_URL}/tours/`, this.httpOptions);
  }

  getTourById(tourId: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.BASE_URL}/tours/${tourId}/`, this.httpOptions);
  }
}

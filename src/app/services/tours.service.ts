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

  BASE_URL = 'https://690bdb6e-fe5f-4a85-a24b-6df9a324b136.mock.pstmn.io';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.BASE_URL}/getTours/`);
  }
}

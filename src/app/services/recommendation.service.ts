import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private BASE_URL = 'http://localhost:8000/v1/recommendations';

  constructor(private http: HttpClient) {}

  getRecommendations(userId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${userId}`);
  }
}
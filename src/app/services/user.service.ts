import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  BASE_URL = 'http://localhost:8000/v1/users';

  getUserData(tokenString: string): Observable<UserData> {
    let httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenString}`,
        }
      )
    };
    return this.http.get<UserData>(`${this.BASE_URL}/me`, httpOptions);
  }
}

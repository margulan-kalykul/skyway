import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token, UserCredentials } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // BASE_URL = 'http://localhost:8080/v1/users';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // };

  // login(user: UserCredentials): Observable<Token> {
  //   return this.http.post<Token>(`${this.BASE_URL}/login`, user, this.httpOptions);
  // }
}

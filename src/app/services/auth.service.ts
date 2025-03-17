import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, UserCredentials } from '../models/interfaces';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  BASE_URL = 'http://localhost:8080/v1/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  login(credentials: UserCredentials): void {
    this.http.post<Token>(`${this.BASE_URL}/login`, credentials, this.httpOptions).subscribe((token) => {
      try {
        this.saveToken(token.token);
        // this.saveCredentials(token.token);
      }
      catch (error) {
        throw error;  // TODO: handle errors
      }
    })
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  saveCredentials(tokenString: string): void {
    try {
      let decodedToken = jwtDecode(tokenString);
      // TODO: save user credentials
      // sessionStorage('username', decodedToken.user_id);
    }
    catch (error) {
      throw error;
    }
  }

  private saveToken(tokenString: string): void {
    sessionStorage.setItem('jwtToken', tokenString);
  }
  
  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }
  
  clearToken(): void {
    sessionStorage.removeItem('jwtToken');
  }  
}

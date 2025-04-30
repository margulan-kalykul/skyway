import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, UserCredentials, UserData } from '../models/interfaces';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    BASE_URL = 'http://localhost:8000/v1/users';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',  // TODO: Not necessary
        }),
        withCredentials: true,
    };

    login(credentials: UserCredentials): void {
        this.http.post<Token>(`${this.BASE_URL}/login/`, credentials, this.httpOptions).subscribe((token) => {
            try {
                this.saveToken(token.token);
                this.saveCredentials(token.token);
            }
            catch (error) {
                throw error;  // TODO: handle errors
            }
        })
    }

    isLoggedIn(): boolean {
        return this.getToken() != null;
    }

    getUserData() {
        return {
            username: localStorage.getItem('username'),
            userId: localStorage.getItem('userId'),
        }
    }

    saveCredentials(tokenString: string): void {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenString}`
            }),
        };
        this.http.get<UserData>(`${this.BASE_URL}/me/`, options).subscribe((userData) => {
            try {
                localStorage.setItem('username', userData.Username);
                localStorage.setItem('userId', userData.ID);
            }
            catch (error) {
                throw error;
            }
        });
    }

    private saveToken(tokenString: string): void {
        localStorage.setItem('jwtToken', tokenString);
    }

    getToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    clearTokens(): void {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
    }
}

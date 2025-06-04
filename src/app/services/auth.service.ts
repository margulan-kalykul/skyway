import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtPayload, RegisterForm, Token, UserCredentials, UserData} from '../models/interfaces';
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

    login(credentials: UserCredentials): Observable<Token> {
        return this.http.post<Token>(`${this.BASE_URL}/login/`, credentials, this.httpOptions);
        // .subscribe((token) => {
        //     try {
        //         this.saveToken(token.token);
        //         this.saveCredentials(token.token);
        //     }
        //     catch (error) {
        //         throw error;  // TODO: handle errors
        //     }
        // })
    }

    register(credentials: RegisterForm): Observable<any> {
        return this.http.post(`${this.BASE_URL}/`, credentials, this.httpOptions);
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
            localStorage.setItem('username', userData.Username);
            localStorage.setItem('userId', userData.ID);
        });
    }

    saveToken(tokenString: string): void {
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

    getRole(): string {
        if (!this.isLoggedIn()) {
            return '';
        }
        let token = this.getToken()!;
        let decodedToken: JwtPayload = jwtDecode(token);
        return decodedToken.role;
    }

    hasRole(role: string): boolean {
        let userRole = this.getRole();
        if (!userRole || userRole.length == 0) {
            return false;
        }
        return userRole == role;
    }

    confirmCode(code: string): Observable<any> {
        return this.http.post(`${this.BASE_URL}/verify/`, {
            session_id: localStorage.getItem('session_id')!,
            code: code,
        }, this.httpOptions);
    }
}

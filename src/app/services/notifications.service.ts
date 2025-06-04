import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Notification {
    ID: string;
    userID: string;
    chatID: string;
    message: string;
    type: 'MESSAGE' | 'PAYMENT';
    recipientID: string;
    read?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    BASE_URL = 'http://localhost:8000/v1/notifications/';

    constructor(private http: HttpClient, private authService: AuthService) {}

    httpOptions(baseOptions: {} = {}): object {
        let options = baseOptions;
        if (this.authService.isLoggedIn()) {
            options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
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

    getNotifications(): Observable<{ notifications: Notification[] }> {
        return this.http.get<{ notifications: Notification[] }>(this.BASE_URL, this.httpOptions());
    }
}
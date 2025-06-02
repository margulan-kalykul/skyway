import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Chat, Message} from '../models/interfaces';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SocialService {
    BASE_URL: string = 'http://localhost:8000/v1/social';

    constructor(private http: HttpClient, private authService: AuthService) {}

    httpOptions(baseOptions: {} = {}): object {
        let options = baseOptions;
        if (this.authService.isLoggedIn()) {
            options = {
                headers: new HttpHeaders({
                    'accept': 'application/json',
                    'Authorization': `Bearer ${this.authService.getToken()!}`,
                }),
                withCredentials: true,
                ...baseOptions,
            };
        }
        else {
            options = {
                headers: new HttpHeaders({
                    'accept': 'application/json',
                }),
                ...baseOptions,
            };
        }
        return options;
    }

    getUserChats(specialOptions: {} = {}): Observable<{chats: Chat[]}>  {
        return this.http.get<{chats: Chat[]}>(`${this.BASE_URL}/chats/`, this.httpOptions(specialOptions));
    }

    getAllChats(specialOptions: {} = {}): Observable<{chats: Chat[]}>  {
        return this.http.get<{chats: Chat[]}>(`${this.BASE_URL}/chats/all/`, this.httpOptions(specialOptions));
    }

    joinChat(chatId: string, specialOptions: {} = {}): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/chats/enter/`, {chat_id: chatId}, this.httpOptions(specialOptions));
    }

    getChatMessages(chatId: string, specialOptions: {} = {}): Observable<{messages: Message[]}> {
        return this.http.get<{messages: Message[]}>(`${this.BASE_URL}/chats/${chatId}/messages/`, this.httpOptions(specialOptions));
    }
}

import {EventEmitter, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {SocialService} from './social.service';
import {HttpClient} from '@angular/common/http';
import {WebsocketMessage} from '../models/classes';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    websocket: WebSocket | undefined;
    newMessage: EventEmitter<any> = new EventEmitter();

    constructor(private authService: AuthService) {}

    openWebsocketConnection(chatId: string) {
        this.websocket = new WebSocket(`ws://localhost:8060/v1/ws?chatID=${chatId}&token=${this.authService.getToken()!}`);

        this.websocket.onopen = (event) => {
            console.log('Websocket opened:', event);
        }

        this.websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Message:', message);
            this.receiveMessage(message);
        }

        this.websocket.onclose = (event) => {
            console.log('Websocket closed:', event);
        }
    }

    receiveMessage(message: any) {
        this.newMessage.emit(message);
    }

    sendWebsocketMessage(message: WebsocketMessage) {
        this.websocket!.send(message.message);
    }

    closeWebsocketConnection() {
        this.websocket?.close();
    }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import {Subscription} from 'rxjs';
import {WebSocketService} from '../../services/web-socket.service';
import {NgFor} from '@angular/common';
import {Chat, Message} from '../../models/interfaces';
import {SocialService} from '../../services/social.service';
import {ActivatedRoute} from '@angular/router';
import {WebsocketMessage} from '../../models/classes';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-chats',
    standalone: true,
    imports: [HeaderComponent, NgFor, FormsModule, ReactiveFormsModule],
    templateUrl: './chats.component.html',
    styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit, OnDestroy {
    imageNames = {
        searchIcon: "assets/images/search.svg",
        yourGroups: "assets/images/your-groups-icon.svg",
        allGroups: "assets/images/all-groups-icon.svg",
        groupImg: "assets/images/no-image-available.png",
    };
    userId: string = '';
    chat: Chat | null = null;
    userChats: Chat[] = [];
    allChats: Chat[] = [];
    messages: Message[] = [];
    // users: Record<string, string> = {};
    private eventSubscription!: Subscription;
    messageForm: FormGroup;

    constructor(
        private webSocketService: WebSocketService,
        private socialService: SocialService,
        private router: ActivatedRoute,
        private fb: FormBuilder,
    ) {
        this.userId = this.router.snapshot.paramMap.get('userId')!;
        this.messageForm = this.fb.group({
            input: ['', ],
        });
    }

    ngOnInit() {
        this.getChats();
        if (this.chat != null) {
            this.loadMessages();
            console.log('Opened connection');
            this.webSocketService.openWebsocketConnection(this.chat.ID);
        }
        this.webSocketService.newMessage.subscribe(message => {
            this.addMessage(message);
        })
    }

    ngOnDestroy() {
        if (this.eventSubscription) {
            this.eventSubscription.unsubscribe();
        }
        this.webSocketService.closeWebsocketConnection();
    }

    getChats() {
        this.socialService.getUserChats().subscribe(response => {
            this.userChats = response.chats;
            let usersChats: string[] = this.userChats.map(chat => chat.ID);
            this.socialService.getAllChats().subscribe(response => {
                let globalChats = response.chats;
                for (let globalChat of globalChats) {
                    if (!usersChats.includes(globalChat.ID)) {
                        this.allChats.push(globalChat);
                    }
                }
            });
        });
    }

    addMessage(message: string) {
        let messageObject: Message = {
            ChatID: this.chat?.ID ?? '',
            ID: '',
            UserID: this.userId,
            chat: undefined,
            text: message,
            user: undefined
        };
        this.messages.push(messageObject);
    }

    openChat(chatId: string): void {
        for (let userChat of this.userChats) {
            if (userChat.ID === chatId) {
                this.chat = userChat;
                break;
            }
        }
        this.loadMessages();
        this.webSocketService.openWebsocketConnection(this.chat!.ID);
    }

    joinChat(chatId: string) {
        this.socialService.joinChat(chatId).subscribe(response => {
            let newAllChats: Chat[] = [], enteredChat: Chat;
            for (let i = 0; i < this.allChats.length; i++) {
                if (this.allChats[i].ID != chatId) {
                    newAllChats.push(this.allChats[i]);
                }
                else {
                    enteredChat = this.allChats[i];
                }
            }
            this.allChats = newAllChats;
            // this.getChats();
            this.userChats.push(enteredChat!);
        });
    }

    sendMessage(): void {
        const chatMessage = new WebsocketMessage(this.userId, this.messageForm.value.input);
        this.webSocketService.sendWebsocketMessage(chatMessage);
        this.addMessage(this.messageForm.value.input);
        this.messageForm.reset({input: ''});
    }

    loadMessages() {
        this.socialService.getChatMessages(this.chat!.ID).subscribe(response => {
            this.messages = response.messages.reverse();
        });
    }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [],
    templateUrl: './notifications.component.html',
    styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
    imageNames = {
        cross: "assets/images/x-circle.svg",
        chat: "assets/images/chat-bubble.svg",
        alertIcon: "assets/images/alert-circle.svg",
    };
    @Output("childShow") showNotifications = new EventEmitter<boolean>();

    closeNot() {
        this.showNotifications.emit(false);
    }
}

import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService, Notification } from '../../services/notifications.service';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notifications.component.html',
    styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
    imageNames = {
        cross: "assets/images/x-circle.svg",
        chat: "assets/images/chat-bubble.svg",
        alertIcon: "assets/images/alert-circle.svg",
        payment: "assets/images/price-icon.svg" // Add a payment icon
    };
    
    @Output("childShow") showNotifications = new EventEmitter<boolean>();
    notifications: Notification[] = [];
    isLoading = true;

    constructor(private notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this.loadNotifications();
    }

    loadNotifications(): void {
        this.notificationsService.getNotifications().subscribe({
            next: (response) => {
                this.notifications = response.notifications;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading notifications:', err);
                this.isLoading = false;
            }
        });
    }

    getNotificationIcon(type: 'MESSAGE' | 'PAYMENT'): string {
        return type === 'MESSAGE' ? this.imageNames.chat : this.imageNames.payment;
    }

    getNotificationText(notification: Notification): string {
        if (notification.type === 'MESSAGE') {
            return notification.message || 'You got a new message';
        } else {
            return 'Payment processed successfully';
        }
    }

    getSubText(notification: Notification): string | null {
        if (notification.type === 'MESSAGE') {
            return 'Tap to reply';
        }
        if (notification.type === 'PAYMENT')
            return 'Check Your Profile for QR-Code'
        return null;
    }

    closeNot() {
        this.showNotifications.emit(false);
    }
}
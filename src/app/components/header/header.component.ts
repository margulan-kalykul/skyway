import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { NotificationsComponent } from "../notifications/notifications.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, NotificationsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  imageNames = {
    skyway: "assets/images/skyway-logo.png",
    // notifications: "assets/images/bell-icon.svg",
    // favorite: "assets/images/heart-icon.svg",
    userProfile: "assets/images/user-icon.svg",
  };
  // isLoggedIn = false;
  @Input() userData: any;
  showNotifications = false;

  constructor (private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // this.isLoggedIn = this.authService.isLoggedIn();
    this.userData = this.authService.getUserData();
  }

  goToMain(): void {
    this.router.navigate(['/home']);
  }

  goToChats(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['chats', this.userData.userId]);
    }
  }

  goToSchedule(): void {
    this.router.navigate(['/schedule']);
  }

  goToTrips(): void {
    this.router.navigate(['/tours']);
  }

  goToContacts(): void {
    this.router.navigate(['/contacts']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile', this.userData.userId]);
  }

  goToFavorites(): void {
    this.router.navigate(['favorites', this.userData.userId]);
  }

  goToNotifications(): void {
    this.showNotifications = true;
  }

  logOut() {
    this.authService.clearTokens();
    this.userData = null;
    this.router.navigate(['/home']);
  }

  goToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth']);
  }

  closeNotifications(): void {
    this.showNotifications = false;
  }
}

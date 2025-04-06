import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
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

  constructor (private router: Router) {}

  ngOnInit(): void {
    // this.isLoggedIn = this.authService.isLoggedIn();
  }

  goToMain(): void {
    this.router.navigate(['/home']);
  }

  goToAboutUs(): void {
    this.router.navigate(['/about-us']);
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
    console.log("Profile pressed")
    this.router.navigate(['/profile', this.userData.user_id]);
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  goToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth']);
  }
}

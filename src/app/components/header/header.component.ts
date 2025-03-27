import { Component, OnInit} from '@angular/core';
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
  isLoggedIn = false;

  constructor (private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
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
    this.router.navigate(['/register']);
  }
}

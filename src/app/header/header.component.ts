import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  imageNames = {
    skyway: "assets/images/skyway-logo.png",
    notifications: "assets/images/bell-icon.svg",
    favorite: "assets/images/heart-icon.svg",
    userProfile: "assets/images/user-icon.svg",
  };
}

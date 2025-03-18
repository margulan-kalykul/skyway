import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-of-page',
  standalone: true,
  imports: [],
  templateUrl: './top-of-page.component.html',
  styleUrl: './top-of-page.component.css'
})
export class TopOfPageComponent {
  imageNames = {
    backgroundImage: "assets/images/backround-image.png",
    userIcon: "assets/images/User.svg",
    skywayLogo: "assets/images/skyway-logo.png",
    
  }

  constructor(private router: Router) { }

  sign_in(): void {
    this.router.navigate(['/sign-in']);
  }
}

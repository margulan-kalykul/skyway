import { Component } from '@angular/core';

@Component({
  selector: 'app-main-details',
  standalone: true,
  imports: [],
  templateUrl: './main-details.component.html',
  styleUrl: './main-details.component.css'
})
export class MainDetailsComponent {
  imageNames = {
    favorite: "assets/images/heart-icon.svg",
    share: "assets/images/share-icon.svg",
    star: "assets/images/rate-star.svg",
    tourImage: "assets/images/tour-example-1.png",  // Change
  };
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-and-purchase',
  standalone: true,
  imports: [],
  templateUrl: './about-and-purchase.component.html',
  styleUrl: './about-and-purchase.component.css'
})
export class AboutAndPurchaseComponent {

  constructor(private router: Router) {}

  goToPurchase() {
    // this.router.navigate(['purchase', userId, tourId]);
  }
}

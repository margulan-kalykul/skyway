import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TourEvent, UserData } from '../../models/interfaces';
import { AuthService } from '../../services/auth.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-about-and-purchase',
  standalone: true,
    imports: [
        CurrencyPipe
    ],
  templateUrl: './about-and-purchase.component.html',
  styleUrl: './about-and-purchase.component.css'
})
export class AboutAndPurchaseComponent {
  @Input() tourEvent: TourEvent = {
    ID: '',
    amount: 0,
    date: '',
    insta_post_url: '',
    is_opened: false,
    place: '',
    price: 0,
    purchases: [],
    Tour: null,
    tour_id: ''
  };
  @Input() userData: UserData | null = null;
  userId: string | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.userId = this.authService.getUserData().userId;
  }

  goToPurchase() {
    console.log(this.userId);
    if (this.userId != null) {
      this.router.navigate(['purchase', this.userId, this.tourEvent.ID]);
    }
    else {
      this.router.navigate(['sign-in']);
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Tour, TourOld } from '../../models/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css'
})
export class TourCardComponent implements OnInit {
  @Input() tour!: Tour;
  @Input() userId!: number | null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  favoritesClicked(): void {
    console.log(this.userId);
    if (this.userId != null) {
      this.router.navigate(['/user', this.userId, 'favorites']);
    }
    else {
      this.router.navigate(['/sign-in']);
    }
  }

  seeDetails(tourId: string): void {
    this.router.navigate(['/tours', tourId]);
  }
}

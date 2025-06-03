import { Component } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { Tour, Image, RecommendationsResponse } from '../../models/interfaces';
import { AuthService } from '../../services/auth.service';
import { RecommendationsService } from '../../services/recommendation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-top-destinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-destinations.component.html',
  styleUrl: './top-destinations.component.css',
  providers:[RecommendationsService]
})
export class TopDestinationsComponent {
  recommendedTours: Tour[] = [];
  currentPart = 0;
  isRightArrowShown = true;
  isLeftArrowShown = false;

  constructor(
    private toursService: ToursService, 
    private authService:AuthService, 
    private recommendationsService: RecommendationsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getRecommendedTours();
  }

  getRecommendedTours(): void {
    const userId = this.authService.getUserData().userId;
    if (userId) {
      this.recommendationsService.getRecommendations(userId).subscribe({
        next: (response: RecommendationsResponse) => {
          const recommendedTourIds = response.recommendations.map(t => t.id);
          this.toursService.getAllTours().subscribe({
            next: (allTours: Tour[]) => {
              // Filter tours to only include recommended ones
              this.recommendedTours = allTours.filter(tour => 
                recommendedTourIds.includes(tour.ID)
              );
              // Update arrow visibility
              this.updateArrowVisibility();
            },
            error: (err: Error) => console.error('Error fetching tours:', err)
          });
        },
        error: (err: Error) => console.error('Error fetching recommendations:', err)
      });
    }
  }

// In your component class (top-destinations.component.ts)
  getImageUrl(imageUrl: string | undefined): string {
    if (imageUrl) {
      // Check if the URL already has the base path
      if (imageUrl.startsWith('http') || imageUrl.startsWith('/assets')) {
        return imageUrl;
      }
      return `http://localhost:8000${imageUrl.replace('./','/')}`;
    }
    return 'assets/images/simple-tour-card-example-1.png'; // Default image path
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/simple-tour-card-example-1.png';
  }

  nextMultiTours(): void {
    if (this.currentPart < this.recommendedTours.length - 4) {
      this.currentPart++;
    }
    this.updateArrowVisibility();
  }

  prevMultiTours(): void {
    if (this.currentPart > 0) {
      this.currentPart--;
    }
    this.updateArrowVisibility();
  }


  private updateArrowVisibility(): void {
    this.isLeftArrowShown = this.currentPart > 0;
    this.isRightArrowShown = this.currentPart < this.recommendedTours.length - 4;
  }

  navigateToTour(tourId: string): void {
    this.router.navigate(['/tours', tourId, 'schedule']);
  }

}

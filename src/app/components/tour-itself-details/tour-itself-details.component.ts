import { Component, Input, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CommonModule } from '@angular/common';
import { TourEvent, Tour } from '../../models/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Viewer } from '@photo-sphere-viewer/core';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';   
import { DomSanitizer } from '@angular/platform-browser';  

@Component({
  selector: 'app-tour-itself-details',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeUrlPipe],
  templateUrl: './tour-itself-details.component.html',
  styleUrl: './tour-itself-details.component.css'
})
export class TourItselfDetailsComponent implements OnInit {
  @Input() tourId: string = '';
  tour: Tour | null = null;
  tourEvents: TourEvent[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  imageNames = {
      favorite: "assets/images/heart-icon.svg",
      share: "assets/images/share-icon.svg",
      star: "assets/images/rate-star.svg",
      tourImage: "assets/images/tour-example-1.png",   
      calendarIcon: "assets/images/calendar.svg",
  };
  panoramas: string[] = [
    'assets/images/charyn360_1.jpg',
    'assets/images/charyn360_2.jpg',
    'assets/images/charyn360_3.jpg',
    'assets/images/charyn360_4.jpg',
    'assets/images/kolsai360_2.jpg',
    'assets/images/kaindy360_1.jpg',
  ];
  viewerStyles = {
    display: 'none'
  };
  viewer: any;
  currentPart = 0;
  isRightArrowShown = true;
  isLeftArrowShown = false;

  constructor(private toursService: ToursService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.tourId.length <= 0) {
      this.tourId = this.activatedRoute.snapshot.paramMap.get('tourId')!;
    }
  }

  ngOnInit() {
    if (this.tourId) {
      this.loadTourData();
    }
    this.viewer = new Viewer({
      container: 'viewer',
      panorama: this.panoramas[0],
       
    });
  }

  nextMultiTours(): void {
    if (this.currentPart < this.panoramas.length-4) {
      this.currentPart++;
    }
    if (this.currentPart === this.panoramas.length-4) {
      this.isRightArrowShown = false;
    }
    else {
      this.isRightArrowShown = true;
    }
    if (this.currentPart === 0) {
      this.isLeftArrowShown = false;
    }
    else {
      this.isLeftArrowShown = true;
    }
  }

  prevMultiTours(): void {
    if (this.currentPart > 0) {
      this.currentPart--;
    }
    if (this.currentPart === 0) {
      this.isLeftArrowShown = false;
    }
    else {
      this.isLeftArrowShown = true;
    }
    if (this.currentPart === this.panoramas.length-4) {
      this.isRightArrowShown = false;
    }
    else {
      this.isRightArrowShown = true;
    }
  }

  selectPanorama(panorama: string) {
    this.viewerStyles = {
      display: 'block'
    };
    this.viewer.setPanorama(panorama, {transition: false});
  }

  loadTourData() {
    this.isLoading = true;
    this.error = null;

     
    this.toursService.getTourById(this.tourId).subscribe({
      next: (tour) => {
        this.tour = tour;

        if (!this.tour?.airpano_link || this.tour?.airpano_link?.length === 0) {
          this.tour.airpano_link = "https://www.airpano.com/embed.php?3D=kazakhstan-kaindy";
        }

        this.updateTourImage();

         
        this.loadTourEvents();
      },
      error: (err) => {
        this.error = 'Failed to load tour details';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  updateTourImage() {
  const tourImages = this.tour?.tour_images;
  if (tourImages && tourImages.length > 0 && tourImages[0].image_url) {
    const imageURL = tourImages[0].image_url;
    this.imageNames.tourImage = imageURL.startsWith('http')
      ? imageURL
      : `http://localhost:8000${imageURL.replace('./','/')}`;
  }
  }

  navigateToTourDetails(tourId: number) {
    this.router.navigate(['/tours', tourId]);
  }
  loadTourEvents() {
    this.toursService.getTourEventsByTourId(this.tourId).subscribe({
      next: (events) => {
        this.tourEvents = events;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tour events';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  formatDate(dateString: string): any {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
}

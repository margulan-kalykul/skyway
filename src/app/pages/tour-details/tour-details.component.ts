import {Component, OnInit} from '@angular/core';
import {TourEvent, UserData} from '../../models/interfaces';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { MainDetailsComponent } from "../../components/main-details/main-details.component";
import { AboutAndPurchaseComponent } from "../../components/about-and-purchase/about-and-purchase.component";
import { TourPlanComponent } from "../../components/tour-plan/tour-plan.component";
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-tour-details',
    standalone: true,
    imports: [HeaderComponent, MainDetailsComponent, AboutAndPurchaseComponent, TourPlanComponent, ReactiveFormsModule],
    templateUrl: './tour-details.component.html',
    styleUrl: './tour-details.component.css'
})
export class TourDetailsComponent implements OnInit {
    tourEvent: TourEvent = {
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
    userData: UserData | null = null;
    tourEventId: string | null = null;

    constructor (
        private toursService: ToursService,
        private userService: UserService,
        private authService: AuthService,
        private router: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.userService.getUserData(this.authService.getToken()!).subscribe(user => {
                this.userData = user;
                console.log(this.userData);
            });
        }
        this.tourEventId = this.router.snapshot.paramMap.get('tourId');
        this.getTour(this.tourEventId!);
    }

    getTour(tourEventId: string): void {
        this.toursService.getTourEventById(tourEventId).subscribe((tourEvent) => {
            this.tourEvent = tourEvent;
        })
    }

}

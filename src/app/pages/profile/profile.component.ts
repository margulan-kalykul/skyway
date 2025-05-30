import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { NgStyle } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserToursComponent } from "../../components/user-tours/user-tours.component";
import { Tour, TourEvent } from '../../models/interfaces';
import { EditProfileComponent } from "../../components/edit-profile/edit-profile.component";
import { ToursService } from '../../services/tours.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [HeaderComponent, NgStyle, UserToursComponent, EditProfileComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    imageNames = {
        avatar: "../../../assets/images/avatar-test.jpeg",
    };
    styles = {
        'background-image': `url("${this.imageNames.avatar}")`
    };
    username: string = '';
    email: string = '';
    pages = {
        events: "events",
        editProfile: "edit_profile",
    };
    shownPage: string = this.pages.events;
    defaultEvent: TourEvent = {
        ID: '',
        amount: 0,
        date: '',
        insta_post_url: '',
        is_opened: false,
        place: '',
        price: 0,
        purchases: [],
        Tour: null,
        tour_id: '',
        tour_image_url: ''
    };
    // defaultTour: Tour = {
    //     ID: '',
    //     description: '',
    //     name: '',
    //     owner_id: '',
    //     route: '',
    //     telegram_chat_url: null,
    //     tour_categories: null,
    //     tour_events: null,
    //     tour_images: [],
    //     tour_location: null,
    //     tour_panoramas: null,
    //     tour_user_favorites: null,
    //     tour_videos: null
    // };
    userTours: TourEvent[] = [this.defaultEvent, this.defaultEvent];
    favTours: Tour[] = [];

    constructor(private userService: UserService, private authService: AuthService, private toursService: ToursService) {
        
    }

    ngOnInit(): void {
        let tokenString = this.authService.getToken();
        this.userService.getUserData(tokenString!).subscribe((userData) => {
            this.username = userData.Username;
            this.email = userData.Email;
        });
        // TODO: Optimize
        this.toursService.getUserInfo().subscribe((userInfo) => {
            let purchasedEvents = userInfo.PurchasedTourEvents;
            this.userTours = [];
            for (let i = 0; i < purchasedEvents.length; i++) {
                this.toursService.getTourEventById(purchasedEvents[i].TourEventID).subscribe((tourEvent) => {
                    this.userTours.push(tourEvent);
                });            
            }
        });
    }

    editProfile() {
        this.shownPage = this.pages.editProfile;
    }

    saveChanges() {
        this.shownPage = this.pages.events;
        // TODO: Send the update data
        this.username = 'user1user';
        this.email = 'user1@example.com';
    }

    returnToProfile() {
        this.shownPage = this.pages.events;
    }
}

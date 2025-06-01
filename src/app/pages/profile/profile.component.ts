import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { NgStyle } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserToursComponent } from "../../components/user-tours/user-tours.component";
import { Tour, TourEvent, Purchase } from '../../models/interfaces';
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
    userInfo: any
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
    userTours: Purchase[] = [];
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
            this.userInfo = userInfo;
            this.userTours = userInfo.PurchasedTourEvents || [];
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

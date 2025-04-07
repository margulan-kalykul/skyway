import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { NgStyle } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserToursComponent } from "../../components/user-tours/user-tours.component";
import { Tour } from '../../models/interfaces';
import { EditProfileComponent } from "../../components/edit-profile/edit-profile.component";

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
    userTours: Tour[] = [
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
        {id: '1', description: 'Desc1', owner_id: '1', route: 'Route1', tour_categories: null, tour_events: null, tour_images: [{ID: '1', image_url: 'http://localhost:4200/assets/images/tour-example-1.png', tour: null, tour_id: '1'},], tour_location: null, tour_videos: null},
    ];

    constructor(private userService: UserService, private authService: AuthService) {
        
    }

    ngOnInit(): void {
        let tokenString = this.authService.getToken();
        this.userService.getUserData(tokenString!).subscribe((userData) => {
            this.username = userData.Username;
            this.email = userData.Email;
        });
    }

    editProfile() {
        this.shownPage = this.pages.editProfile;
    }

    saveChanges() {

    }

    returnToProfile() {
        this.shownPage = this.pages.events;
    }
}

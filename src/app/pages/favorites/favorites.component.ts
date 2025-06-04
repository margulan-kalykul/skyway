import { Component, OnInit } from '@angular/core';
import { Tour } from '../../models/interfaces';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToursService } from '../../services/tours.service';
import { HeaderComponent } from "../../components/header/header.component";
import { UserToursComponent } from "../../components/user-tours/user-tours.component";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [HeaderComponent, UserToursComponent, NgIf],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
    username: string = '';
    // defaultEvent: TourEvent = {
    //     ID: '',
    //     amount: 0,
    //     data: '',
    //     insta_post_url: '',
    //     is_opened: false,
    //     place: '',
    //     price: 0,
    //     purchases: [],
    //     Tour: null,
    //     tour_id: ''
    // };
    favTours: Tour[] = [];
    tour: string = "tour";
    constructor(private userService: UserService, private authService: AuthService, private toursService: ToursService) {
        let tokenString = this.authService.getToken();
        this.userService.getUserData(tokenString!).subscribe((userData) => {
            this.username = userData.Username;
        });
        this.toursService.getUserInfo().subscribe((userInfo) => {
            let favs = userInfo.FavoriteTours;
            for (let i = 0; i < favs.length; i++) {
                this.toursService.getTourById(favs[i].tour_id).subscribe((tour) => {
                    this.favTours.push(tour);
                });
            }
        });
    }

    ngOnInit(): void {
    }
}

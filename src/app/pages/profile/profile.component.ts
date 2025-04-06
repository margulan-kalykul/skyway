import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import {AboutAndPurchaseComponent} from "../../components/about-and-purchase/about-and-purchase.component";
import {MainDetailsComponent} from "../../components/main-details/main-details.component";
import {TourPlanComponent} from "../../components/tour-plan/tour-plan.component";

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}

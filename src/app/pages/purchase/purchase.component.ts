import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Purchase, PurchaseRequest } from '../../models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  imageNames = {
    clock: "assets/images/clock.svg",
    people: "assets/images/users.svg",
    globe: "assets/images/language.svg",
    loading: "assets/images/loading-icon.gif",
    check: "assets/images/check.svg",
  };
  cardForm: FormGroup;
  tourEventId: string;
  requestStage = 0;
  
  constructor(
    private fb: FormBuilder, 
    private activatedRouter: ActivatedRoute, 
    private router: Router,
    private http: HttpClient, 
    private authService: AuthService
  ) {
    this.cardForm = this.fb.group({
      name: [''],
      cardNumber: [''],
      validDate: [''],
      CVV: [''],
    });

    this.tourEventId = this.activatedRouter.snapshot.paramMap.get('tourId')!;
  }

  submit() {
    let cardData = {
      name: this.cardForm.value.name,
      cardNumber: this.cardForm.value.cardNumber,
      validDate: this.cardForm.value.validDate,
      CVV: this.cardForm.value.CVV
    };
    console.log(cardData);
    this.http.post<Purchase>(
      'http://localhost:8000/v1/tours/payment/', 
      {tour_event_id: this.tourEventId} as PurchaseRequest, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getToken()!}`
        })
      }
    );
    this.requestStage = 1;
    setTimeout(() => {
      this.requestStage = 2;
    }, 2000);
  }

  goToHome() {
    console.log('Home');
    this.router.navigate(['home']);
  }
}

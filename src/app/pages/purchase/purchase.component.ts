import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, FooterComponent],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  imageNames = {
    clock: "assets/images/clock.svg",
    people: "assets/images/users.svg",
    globe: "assets/images/language.svg",
  };
  cardForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      
    });
  }
}

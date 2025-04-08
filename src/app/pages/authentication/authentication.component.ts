import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  imageNames = {
    email: "assets/images/email-white.svg",
    google: "assets/images/google-icon.svg",
  };
  filePaths = {
    terms: "https://docs.google.com/document/d/1MomfzGKo3FumSV9ACjVe-Dm6o2RUhs_RLBBsVeojPIA/edit?usp=sharing",
    privacy: "https://docs.google.com/document/d/1boK_WokBCDM2i4Lz-7gj1m12PUTQ5juAtVhck05PpNw/edit?usp=sharing",
  };

  constructor(private router: Router) {}

  goToRegisterByEmail(): void {
    this.router.navigate(['/register'])
  }

  goToSignIn(): void {
    this.router.navigate(['/sign-in'])
  }
}

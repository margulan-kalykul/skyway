import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  imageNames = {
    // footerEmblem: "assets/images/footer-emblem.png",  // Emblem at the footer
    // tripAdvisorAward: "assets/images/trip-advisor-award.png",  // Icon showing TripAdvisor's Travelers' Choice award
    // whatsapp: "assets/images/whatsapp.png",
    // telegram: "assets/images/telegram.png",
    // instagram: "assets/images/instagram.png",
    // facebook: "assets/images/facebook.png",
    // youtube: "assets/images/youtube.png",
    facebook: "assets/images/facebook.svg",
    twitter: "assets/images/twitter.svg",
    instagram: "assets/images/instagram.svg",
    phone: "assets/images/phone-icon.svg",
    mail: "assets/images/mail-icon.svg",
  }
}

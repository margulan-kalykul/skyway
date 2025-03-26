import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-short-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './short-search.component.html',
  styleUrl: './short-search.component.css'
})
export class ShortSearchComponent {
  imageNames = {
    searchSubmit: "assets/images/search.svg",
  };
  place = '';
  date = '';

  constructor (private router: Router) {
  }

  goToSearch(): void {
    localStorage.setItem('place', this.place);
    localStorage.setItem('date', this.date);
    this.router.navigate(['/tours']);  // TODO: make the page
  }
}

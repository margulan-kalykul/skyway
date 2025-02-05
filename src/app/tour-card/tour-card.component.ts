import { Component, Input } from '@angular/core';
import { Tour } from '../models/interfaces';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css'
})
export class TourCardComponent {
  @Input() tour!: Tour;
}

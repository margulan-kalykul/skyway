import { Component, OnInit } from '@angular/core';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { ToursService } from '../services/tours.service';
import { Tour } from '../models/interfaces';

@Component({
  selector: 'app-all-tours',
  standalone: true,
  imports: [TourCardComponent],
  templateUrl: './all-tours.component.html',
  styleUrl: './all-tours.component.css'
})
export class AllToursComponent implements OnInit {
  tours: Tour[];

  constructor(private toursService: ToursService) {
    this.tours = [];
  }

  ngOnInit(): void {
    this.getTours();
    console.log("Tours:")
    console.log(this.tours);
  }

  getTours(): void {
    this.toursService.getTours().subscribe((tours) => {
      this.tours = tours;
    })
  }
}

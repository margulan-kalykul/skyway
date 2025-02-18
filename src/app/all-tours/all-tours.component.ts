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
  tours: Tour[][];
  headers_list: string[];

  constructor(private toursService: ToursService) {
    this.tours = [[]];
    this.headers_list = [];
  }

  ngOnInit(): void {
    this.getTours();
    this.getHeaders();
  }

  getTours(): void {
    this.toursService.getToursWithHeaders().subscribe((toursWithHeaders) => {
      this.tours = toursWithHeaders;
    })
  }

  getHeaders(): void {
    this.toursService.getHeaders().subscribe((headers) => {
      this.headers_list = headers;
    })
  }
}

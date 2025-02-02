import { Component } from '@angular/core';
import { TourCardComponent } from '../tour-card/tour-card.component';


interface Tour {
  id: number;
  name: string;
}

@Component({
  selector: 'app-all-tours',
  standalone: true,
  imports: [TourCardComponent],
  templateUrl: './all-tours.component.html',
  styleUrl: './all-tours.component.css'
})
export class AllToursComponent {
  place1 = "margin-left: 50px;";
  tours: Tour[] = [{id: 1, name: "Tour1"}, {id: 2, name: "Tour2"}, {id: 3, name: "Tour3"}, {id: 4, name: "Tour4"}, ]
}

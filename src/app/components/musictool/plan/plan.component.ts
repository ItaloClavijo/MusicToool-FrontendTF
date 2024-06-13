import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListplanComponent } from './listplan/listplan.component';
import { CreaeditaplanComponent } from './creaeditaplan/creaeditaplan.component';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [RouterOutlet, ListplanComponent],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent implements OnInit{
  constructor(public icRoute:ActivatedRoute) { }
  ngOnInit(): void {

  }
}

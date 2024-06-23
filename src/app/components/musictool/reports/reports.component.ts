import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Reporte1Component } from './reporte1/reporte1.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterOutlet,Reporte1Component],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{
  constructor(public route:ActivatedRoute) { }
  
  ngOnInit(): void {
    
  }
}

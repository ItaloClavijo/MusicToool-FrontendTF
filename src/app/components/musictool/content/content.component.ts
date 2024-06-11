import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListContentComponent } from './list-content/list-content.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterOutlet,ListContentComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {
  constructor(public route:ActivatedRoute) { }
  ngOnInit(): void {

  }
}
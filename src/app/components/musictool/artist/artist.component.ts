import { Component, OnInit } from '@angular/core';
import { ListartistComponent } from './listartist/listartist.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [RouterOutlet, ListartistComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit{
  constructor(public route:ActivatedRoute) { }
  ngOnInit(): void {

  }
}

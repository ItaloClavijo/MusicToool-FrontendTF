import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { ListLibraryComponent } from './list-library/list-library.component';
import { CreateEditLibraryComponent } from './create-edit-library/create-edit-library.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [RouterOutlet,ListLibraryComponent,CreateEditLibraryComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent  implements OnInit {
  constructor(public icRoute:ActivatedRoute) { }
  ngOnInit(): void {

  }
}
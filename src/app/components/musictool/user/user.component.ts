import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListuserComponent } from './listuser/listuser.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, ListuserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  constructor(public route:ActivatedRoute) { }
  ngOnInit(): void {

  }
}

import { Component, OnInit } from '@angular/core';
import { ListmessageComponent } from './listmessage/listmessage.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    RouterOutlet, 
    ListmessageComponent
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{
  constructor(public icRoute:ActivatedRoute) { }
  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListchatComponent } from './listchat/listchat.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    RouterOutlet,
    ListchatComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  constructor(public icRoute: ActivatedRoute) {}
  ngOnInit(): void {}
}

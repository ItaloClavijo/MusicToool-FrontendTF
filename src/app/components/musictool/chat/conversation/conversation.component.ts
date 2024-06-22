import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../services/chat.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,CommonModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  currentUserId: number = 1; // Replace with the actual user ID
  chatId: number = 1; // Replace with the actual chat ID

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages(this.chatId).subscribe((messages: any[]) => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    const message = {
      usersId: this.currentUserId,
      message: this.newMessage,
      chatId: this.chatId,
      timestamp: new Date()
    };

    this.chatService.sendMessage(this.chatId, message).subscribe(() => {
      this.messages.push(message);
      this.newMessage = '';
    });
  }

}

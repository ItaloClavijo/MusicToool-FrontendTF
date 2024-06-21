import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink,Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chat } from '../../../../model/Chat';
import { Message } from '../../../../model/Message';
import { ChatService } from '../../../../services/chat.service';
import { MessageService } from '../../../../services/message.service';
@Component({
  selector: 'app-creaeditachat',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './creaeditachat.component.html',
  styleUrl: './creaeditachat.component.css'
})
export class CreaeditachatComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  chats: Chat = new Chat();
  listaMensaje: Message[] = [];
  edicion:boolean=false;
  id: number = 0;
  listaresponsables: { value: string; viewValue: string }[] = [
    { value: 'Coordinador', viewValue: 'Coordinador' },
    { value: 'Gerente', viewValue: 'Gerente' },
  ];

  constructor(
    private chatservice: ChatService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageservice: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      codigo1: ['', Validators.required],
      codigo2:['',Validators.required],
    });
    this.messageservice.list().subscribe((data) => {
      this.listaMensaje = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.chats.idChat = this.form.value.codigo;
      this.chats.user1id = this.form.value.codigo1;
      this.chats.user2id = this.form.value.codigo2;
      this.chatservice.insert(this.chats).subscribe((data) => {
        this.chatservice.getChats().subscribe((data) => {
          this.chatservice.setList(data);
        });
      });

      this.router.navigate(['chats']);
    }
  }

  init() {
    if (this.edicion) {
      this.chatservice.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idChat),
          codigo1: new FormControl(data.user1id),
          codigo2: new FormControl(data.user2id),
        });
      });
    }
  }
}

import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink,Router, ActivatedRoute, Params } from '@angular/router';
import moment from 'moment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '../../../../model/Message';
import { MessageService } from '../../../../services/message.service';
@Component({
  selector: 'app-creaedita-message',
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
    MatIconModule,
    NgIf
  ],
  templateUrl: './creaedita-message.component.html',
  styleUrl: './creaedita-message.component.css'
})
export class CreaeditaMessageComponent {
  form: FormGroup = new FormGroup({});
  message: Message = new Message();

  edicion: boolean = false;
  id: number = 0;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  codigochat: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
  ];

constructor(
  private mesaggeService: MessageService,
  private router: Router,
  private formBuilder: FormBuilder,
  private route: ActivatedRoute
) { }

ngOnInit(): void {
  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });
  this.form = this.formBuilder.group({
    codigomensaje: [''],
    //nombreusuario: ['', Validators.required],
    descripcionmensaje: ['', Validators.required],
    fechademensaje: ['', Validators.required],
    codigochat: ['', Validators.required],
  });
}
aceptar(): void {
  if (this.form.valid) {
    this.message.idMessage = this.form.value.codigomensaje;
    //this.message.descriptionMessage = this.form.value.nombreusuario;
    this.message.descriptionMessage = this.form.value.descripcionmensaje;
    this.message.dateMessage = this.form.value.fechademensaje;
    this.message.chat_id = this.form.value.codigochat;
    this.mesaggeService.insert(this.message).subscribe((data) => {
      this.mesaggeService.list().subscribe((data) => {
        this.mesaggeService.setList(data);
      });
    });
    this.router.navigate(['message']);
  }
}

init() {
  if (this.edicion) {
    this.mesaggeService.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        codigomensaje: new FormControl(data.idMessage),
        descripcionmensaje: new FormControl(data.descriptionMessage),
        fechademensaje: new FormControl(data.dateMessage),
        codigochat: new FormControl(data.chat_id),
      });
    });
  }
}
}

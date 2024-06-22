import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Users } from '../../../../model/User';
import { UserService } from '../../../../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MediaService } from '../../../../services/media.service';

@Component({
  selector: 'app-createedituser',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './createedituser.component.html',
  styleUrl: './createedituser.component.css',
})
export class CreateedituserComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: Users = new Users();

  edicion: boolean = false;
  id: number = 0;
  maxFecha: Date = moment().add(-1, 'days').toDate();

  estados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Activo' },
    { value: false, viewValue: 'Deshabilitado' },
  ];

  constructor(
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      if ((this.edicion = data['id'] != null)) {
        this.init();
      }
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: [
      '',
        [Validators.required, Validators.min(3), Validators.max(30)],
      ],
      contra: [
        '',
        [Validators.required, Validators.min(10), Validators.max(200)],
      ],
      estado: [''],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$'
          ),
          Validators.min(13),
          Validators.max(80),
        ],
      ],
      desc: [''],
      file: ['']
    });
  }

  registrar(): void {
    if (this.form.valid) {
      const username = this.form.value.usuario;
      this.uS.existsByUsername(username).subscribe((exists: boolean) => {
        if (exists && !this.edicion) {
          this.form.controls['usuario'].setErrors({ usernameTaken: true });
          this.snackbar.open('El nombre de usuario ya está en usoEl nombre de usuario ya está en uso', '', {
            duration: 3000,
          });
        } else {
          console.log(this.form.value);
          this.user.id = this.form.value.codigo;
          this.user.username = this.form.value.nombre;
          this.user.password = this.form.value.contra;
          this.user.enabled = true;
          this.user.email = this.form.value.correo;
          this.user.file = this.form.value.file;
          if (this.form.value.desc === '') {
            this.user.description = 'Hola, soy ' + `${this.form.value.nombre}`;
          } else {
            this.user.description = this.form.value.desc;
          }
          this.uS.insert(this.user).subscribe((data) => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data);
            });
          });
          this.router.navigate(['usuarios']);
        }
      });
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.username),
          contra: new FormControl(data.password),
          estado: new FormControl(data.enabled),
          correo: new FormControl(data.email),
          desc: new FormControl(data.description),
          file: new FormControl(data.file)
        });
      });
    }
  }

  uploadFile(event: any, control: string) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file)

      this.mediaService.upload(formData).subscribe(response => {
        console.log('res', response)
        this.form!.get(control)!.setValue(response.path);
      }
      )
    }
  }
}

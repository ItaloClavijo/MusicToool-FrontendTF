import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ApiImgPipe } from '../../../../shared/api-img.pipe';
import { Users } from '../../../model/User';
import { UserService } from '../../../services/user.service';
import { NgIf } from '@angular/common';
import { Roles } from '../../../model/Role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, MatFormFieldModule,ReactiveFormsModule, MatButtonModule, MatInputModule,ApiImgPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  user: Users = new Users();
  id: number = 0;
  rol: Roles = new Roles();
  
  constructor(
    private uS: UserService,
    private rS: RoleService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
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
        if (exists) {
          this.form.controls['usuario'].setErrors({ usernameTaken: true });
          this.snackbar.open('El nombre de usuario ya está en uso', '', {
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
          this.router.navigate(['login']);
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Roles } from '../../../../model/Role';
import { Users } from '../../../../model/User';
import { RoleService } from '../../../../services/role.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-createeditrole',
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
  templateUrl: './createeditrole.component.html',
  styleUrl: './createeditrole.component.css'
})
export class CreateeditroleComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  role: Roles = new Roles();
  listaUsuarios: Users[] = [];
  listaRoles: { value: string; viewValue: string }[] = [
    { value: 'MELOMANO', viewValue: 'Artista' },
    { value: 'ADMIN', viewValue: 'Administrador' },
  ];

  constructor(
    private rS: RoleService,
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      descripcion: ['', Validators.required],
      roles: ['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.role.roleDescription = this.form.value.descripcion;
      this.role.roleName = this.form.value.fecha;
      this.role.usersId.id = this.form.value.verde;
      this.rS.insert(this.role).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });

      this.router.navigate(['mantenimientos']);
    }
  }
}

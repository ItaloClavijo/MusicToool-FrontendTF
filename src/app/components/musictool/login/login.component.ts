import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../../model/jwtRequest';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ApiImgPipe } from '../../../../shared/api-img.pipe';
import { RoleService } from '../../../services/role.service';
import { Roles } from '../../../model/Role';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule,ApiImgPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private roleService: RoleService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  id: number = 0;
  rol: Roles = new Roles();
  role:string = "";
  idR: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
    });
  }
  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['home']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
    this.role = this.loginService.showRole();
    this.idR = this.loginService.getId();
    if(this.role === ""){
      this.rol.id = 0;
      this.rol.roleDescription = "soy un melomano";
      this.rol.roleName = "MELOMANO";
      this.rol.usersId.id = this.idR;
      this.roleService.insert(this.rol).subscribe((data) => {
        this.roleService.list().subscribe((data: Roles[]) => {
          this.roleService.setList(data);
        });
      });
    }
  }
}

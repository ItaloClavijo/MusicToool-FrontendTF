import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
     MatIconModule,
     MatMenuModule,
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MusicToool-FrontendTF';
  username: string = ''
  role: string = '';
  constructor(private loginService: LoginService,
  ) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    this.username = this.loginService.showUser();
    return this.loginService.verificar();
  }
  isUser() {
    return this.role === 'USER';
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }
  

}

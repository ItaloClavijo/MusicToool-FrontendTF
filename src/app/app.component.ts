import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, NgIf } from '@angular/common';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
import { ApiImgPipe } from '../shared/api-img.pipe';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
     MatIconModule,
     MatMenuModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    ApiImgPipe,
    CommonModule,
    MatBadgeModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MusicToool-FrontendTF';
  username: string = ''
  role: string = '';
  constructor(private loginService: LoginService,
    private cartService: CartService
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
  
  get contentsInCart() {
    return this.cartService.contents();
  }

  get total() {
    return this.cartService.total();
  }


}

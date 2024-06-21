import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../model/jwtRequest';

const authKey = 'musictool_auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(request: JwtRequest) {
    return this.http.post('http://localhost:8084/login', request);
  }

  verificar() {
    if (isPlatformBrowser(this.platformId)) {
      let token = sessionStorage.getItem('token');
      return token != null;
    }
    return false;
  }

  showRole() {
    if (isPlatformBrowser(this.platformId)) {
      let token = sessionStorage.getItem('token');
      if (!token) {
        // Manejar el caso en el que el token es nulo.
        return null; // O cualquier otro valor predeterminado dependiendo del contexto.
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken?.role;
    }
    return null;
  }

  showUser() {
    if (isPlatformBrowser(this.platformId)) {
      let token = sessionStorage.getItem('token');
      if (!token) {
        return null;
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log(decodedToken);
      return decodedToken?.username;
    }
    return null;
  }
}


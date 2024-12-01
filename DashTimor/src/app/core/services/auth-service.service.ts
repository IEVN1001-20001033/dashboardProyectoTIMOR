import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/login_api/usuarios/login';
  private usrLogueado: any = null;

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post(this.apiUrl, { correo, contrasena });
  }

  setUser(user: any): void {
    this.usrLogueado = user;
    localStorage.setItem('usrLogueado', JSON.stringify(user));
  }

  getUser(): any {
    if (!this.usrLogueado) {
      this.usrLogueado = JSON.parse(localStorage.getItem('usrLogueado') || 'null');
    }
    return this.usrLogueado;
  }
  logout(): void {
    this.usrLogueado = null;
    localStorage.removeItem('usrLogueado');
  }

}

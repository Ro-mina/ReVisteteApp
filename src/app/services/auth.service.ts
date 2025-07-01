import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioRegistro {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  genero: string;
  correo: string;
  contrasena: string;
}

export interface UsuarioLogin {
  correo: string;
  contrasena: string;
}

export interface UsuarioRespuesta {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  genero: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://192.168.1.117:8000';

  constructor(private http: HttpClient) {}

  register(usuario: UsuarioRegistro): Observable<UsuarioRespuesta> {
    return this.http.post<UsuarioRespuesta>(`${this.apiUrl}/register`, usuario);
  }

  login(credenciales: { correo: string; contrasena: string }) {
    return this.http.post<UsuarioRespuesta>(`${this.apiUrl}/login`, credenciales);
  }
}

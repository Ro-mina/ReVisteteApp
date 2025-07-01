import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prenda } from '../models/prenda.model';

@Injectable({
  providedIn: 'root'
})
export class PrendaService {
 private apiUrl = 'http://192.168.1.117:8000';

  constructor(private http: HttpClient) {}

  getPrendas(): Observable<Prenda[]> {
    return this.http.get<Prenda[]>(`${this.apiUrl}/prendas`);
  }

  publicarPrenda(prenda: Prenda): Observable<Prenda> {
    return this.http.post<Prenda>(`${this.apiUrl}/prendas`, prenda);
  }

  getPrendasPorUsuario(usuarioId: number): Observable<Prenda[]> {
    return this.http.get<Prenda[]>(`${this.apiUrl}/prendas/usuario/${usuarioId}`);
  }
}

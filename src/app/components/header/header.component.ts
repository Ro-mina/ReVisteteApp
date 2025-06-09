import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  @Input() nombreUsuario: string = 'Invitado';
  usuarioLogeado: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('nombreUsuario');
    this.usuarioLogeado = !!usuario;
  }

  cerrarSesion() {
    localStorage.removeItem('prendas');
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/login']);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ServiciodbService } from 'services/serviciodb.service';
import { UsuarioService } from '../services/usuario.service';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
  standalone:false
})
export class MiCuentaPage implements OnInit {
  nombreUsuario: string = '';
  correo: string = '';

  constructor(private router: Router, private menu: MenuController, private dbService: ServiciodbService,private usuarioService: UsuarioService ) {}
  usuarioLogeado = false;
  
  async ngOnInit() {
    const usuario = await this.usuarioService.obtenerUsuario();
    this.nombreUsuario = usuario?.nombre || 'Invitado';
  }

  editarPerfil() {   
    this.router.navigate(['/editar-perfil']);
  }

  verMisPublicaciones() {
    this.router.navigate(['/mis-publicaciones']);
  }

  irA(ruta: string) {
    this.menu.close('menuLateral');
    this.router.navigate(['/' + ruta]);
  }

  async cerrarSesion() {
    await Preferences.remove({ key: 'usuario' });
    await Preferences.remove({ key: 'nombreUsuario' });
    await Preferences.remove({ key: 'prendas' }); // 

    const { keys } = await Preferences.keys();
    console.log('Claves guardadas después del logout:', keys);

    this.router.navigate(['/login']);
  }
}

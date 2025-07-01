import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HeaderComponent {
  @Input() nombreUsuario: string = '';
  usuarioLogeado = false;

  constructor(
    private router: Router,
    private menu: MenuController
  ) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'nombreUsuario' });
    if (value) {
      this.nombreUsuario = value;
      this.usuarioLogeado = true;
    }
  }

  abrirMenuLateral() {
    this.menu.enable(true, 'menuLateral'); 
    this.menu.open('menuLateral');
  }


  async cerrarSesion() {
    await Preferences.remove({ key: 'usuario' });
    await Preferences.remove({ key: 'nombreUsuario' });
    await Preferences.remove({ key: 'prendas' }); 
    const { keys } = await Preferences.keys();
    console.log('Claves guardadas después del logout:', keys);

    this.router.navigate(['/login']);
  }
  irALogin() {
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private router: Router,
    private menu: MenuController,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        console.log(' Ejecutando en Android');
        
        this.menu.swipeGesture(true, 'menuLateral');
      }

      if (this.platform.is('ios')) {
        console.log(' Ejecutando en iOS');
        
        this.menu.swipeGesture(false, 'menuLateral');
      }

      if (this.platform.is('mobileweb')) {
        console.log(' Ejecutando en Web Móvil');
        
      }
    });
  }

  irA(ruta: string) {
    this.menu.close();
    if (this.router.url !== ruta) {
      this.router.navigate([ruta]);
    }
  }

  async cerrarSesion() {
    await Preferences.remove({ key: 'usuario' });
    await Preferences.remove({ key: 'nombreUsuario' });
    await Preferences.remove({ key: 'prendas' });

    await this.menu.enable(false, 'menuLateral');
    await this.menu.close('menuLateral');

    const { keys } = await Preferences.keys();
    console.log('Claves guardadas después del logout:', keys);

    this.router.navigate(['/login']);
  }
}

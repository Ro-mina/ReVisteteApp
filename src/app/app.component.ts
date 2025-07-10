import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { StatusBar, Style } from '@capacitor/status-bar';

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

  // Método para configurar la barra de estado
  async initializeApp() {
    await this.platform.ready();

    try {
      // Evita que la status bar tape tu contenido
      await StatusBar.setOverlaysWebView({ overlay: false });

      // Cambia el color de fondo de la status bar
      await StatusBar.setBackgroundColor({ color: '#ffffff' });

      // Establece el estilo del texto (claro u oscuro)
      await StatusBar.setStyle({ style: Style.Dark });
    } catch (error) {
      console.log('Error configurando StatusBar:', error);
    }
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

    const { keys } = await Preferences.keys();
    console.log('Claves guardadas después del logout:', keys);

    this.router.navigate(['/login']);
    this.menu.close();
  }
}

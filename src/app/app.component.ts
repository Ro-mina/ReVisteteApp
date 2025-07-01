import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router, private menu: MenuController) {}

    irA(ruta: string) {
    this.menu.close();
    if (this.router.url !== ruta) {
      this.router.navigate([ruta]);
    }
  }
}

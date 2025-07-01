import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { PrendaService } from '../services/prenda.service';
import { Preferences } from '@capacitor/preferences';
import { NetworkService } from '../services/network.service';
import { Prenda } from '../models/prenda.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  nombreUsuario: string = '';
  prendas: Prenda[] = [];
  prendasFiltradas: Prenda[] = [];

  filtros = {
    talla: '',
    tipo: '',
    estado: '',
    ubicacion: ''
  };

  constructor(
    private router: Router,
    public menu: MenuController,
    private prendaService: PrendaService,
    private networkService: NetworkService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const usuario = await Preferences.get({ key: 'usuario' });
    this.nombreUsuario = usuario.value ? JSON.parse(usuario.value).nombre : 'Invitado';    
  }

  async ionViewWillEnter() {
    const conectado = await this.networkService.hayInternet();

    if (conectado) {
      this.prendaService.getPrendas().subscribe({
        next: async (datos) => {
          this.prendas = datos;
          this.prendasFiltradas = [...datos]; // 
          await Preferences.set({ key: 'prendas', value: JSON.stringify(datos) });
          console.log(' Prendas cargadas desde API:', datos);
        },

        error: async () => {
          await this.mostrarToast('No se pudieron cargar las prendas desde la API.');
          await this.cargarPrendasDesdeLocal();
        }
      });
    } else {
      await this.mostrarToast('Sin conexión. Mostrando prendas guardadas.');
      await this.cargarPrendasDesdeLocal();
    }
  }

  private async cargarPrendasDesdeLocal() {
    const { value } = await Preferences.get({ key: 'prendas' });
    this.prendas = value ? JSON.parse(value) : [];
    this.prendasFiltradas = [...this.prendas];
    console.log(' Prendas cargadas localmente:', this.prendas);
  }


  aplicarFiltros() {
    this.prendasFiltradas = this.prendas.filter(p =>
      (!this.filtros.talla || p.talla === this.filtros.talla) &&
      (!this.filtros.tipo || p.tipo === this.filtros.tipo) &&
      (!this.filtros.estado || p.estado === this.filtros.estado) &&
      (!this.filtros.ubicacion || p.ubicacion === this.filtros.ubicacion)
    );

    console.log('Filtros activos:', this.filtros);
    console.log('Resultados:', this.prendasFiltradas);
    this.menu.close('filtrosMenu');
  }


  limpiarFiltros() {
    this.filtros = {
      talla: '',
      tipo: '',
      estado: '',
      ubicacion: ''
    };
    this.prendasFiltradas = [...this.prendas];
    this.menu.close('filtrosMenu');
  }

  abrirMenu() {
    this.menu.open('menu-filtros');
  }

  cerrarMenu() {
    this.menu.close('menu-filtros');
  }

  async verDetalle(id: number) {
    const { value } = await Preferences.get({ key: 'usuario' });
    console.log('Usuario guardado antes de navegar:', value);
    this.router.navigate(['/detalle-prenda', id]);
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: 'warning'
    });
    await toast.present();
  }

  irAPublicar() {
    this.router.navigate(['/publicar']);
  }
}

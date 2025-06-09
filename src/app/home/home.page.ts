import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';


interface Prenda {
  id: number;
  imagen: string;
  titulo: string;
  talla: string;
  tipo: string;
  estado: string;
  ubicacion: string;
  precio: number;
  publicadoPor: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})

export class HomePage implements OnInit {
  nombreUsuario: string = '';

  prendas: Prenda[] = [];

  filtros = {
    talla: '',
    tipo: '',
    estado: '',
    ubicacion: ''
  };

  constructor(private router: Router, private menu: MenuController) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';
  }

  ionViewWillEnter() {
    const usuario = this.nombreUsuario || 'Invitado';
    const publicadas = (JSON.parse(localStorage.getItem('prendas') || '[]') as Prenda[]).map(p => ({
      ...p,
      publicadoPor: p.publicadoPor || usuario
    }));

    this.prendas = [
      {
        id: 1,
        imagen: 'assets/img/polera1.jpeg',
        titulo: 'Polera negra',
        talla: 'M',
        tipo: 'Polera',
        estado: 'Como nueva',
        ubicacion: 'Santiago',
        precio: 5000,
        publicadoPor: 'Admin'
      },
      {
        id: 2,
        imagen: 'assets/img/jeans1.jpeg',
        titulo: 'Jeans celeste',
        talla: 'L',
        tipo: 'Pantalón',
        estado: 'Usado',
        ubicacion: 'Valparaíso',
        precio: 7000,
        publicadoPor: 'Admin'
      },
      {
        id: 3,
        imagen: 'assets/img/chaqueta1.jpeg',
        titulo: 'Chaqueta jeans',
        talla: 'M',
        tipo: 'Chaqueta',
        estado: 'Usado',
        ubicacion: 'Concepción',
        precio: 13500,
        publicadoPor: 'Admin'
      },
      {
        id: 4,
        imagen: 'assets/img/vestido1.jpeg',
        titulo: 'Vestido jumper',
        talla: 'S',
        tipo: 'Vestido',
        estado: 'Usado',
        ubicacion: 'Santiago',
        precio: 6500,
        publicadoPor: 'Admin'
      },
      ...publicadas
    ];
  }

  get prendasFiltradas() {
    return this.prendas.filter(p =>
      (!this.filtros.talla || p.talla === this.filtros.talla) &&
      (!this.filtros.tipo || p.tipo === this.filtros.tipo) &&
      (!this.filtros.estado || p.estado === this.filtros.estado) &&
      (!this.filtros.ubicacion || p.ubicacion === this.filtros.ubicacion)
    );
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle-prenda', id]);
  }

  cerrarSesion() {
    localStorage.removeItem('prendas');
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/login']);
  }

  abrirMenu() {
    this.menu.open('filtrosMenu');
  }

  cerrarMenu() {
    this.menu.close('filtrosMenu');
  }

  limpiarFiltros() {
    this.filtros = {
      talla: '',
      tipo: '',
      estado: '',
      ubicacion: ''
    };
    this.menu.close('filtrosMenu');
  }

  irAPublicar() {
    this.router.navigate(['/publicar']);
  }
}

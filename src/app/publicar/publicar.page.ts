import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Prenda {
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  estado: string;
  talla: string;
  ubicacion: string;
  precio: number;
  publicadoPor: string; 
}

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
  standalone: false
})
export class PublicarPage {
  nombreUsuario: string = '';
  nuevaPrenda: Prenda = {
    id: 0,
    imagen: '',
    titulo: '',
    descripcion: '',
    tipo: '',
    estado: '',
    talla: '',
    ubicacion: '',
    precio: 0,
    publicadoPor: '' 
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';
  }

  publicarPrenda() {
    const prendas = JSON.parse(localStorage.getItem('prendas') || '[]');
    this.nuevaPrenda.id = Date.now();
    this.nuevaPrenda.publicadoPor = this.nombreUsuario; // 
    prendas.push(this.nuevaPrenda);
    localStorage.setItem('prendas', JSON.stringify(prendas));
    this.router.navigate(['/home']);
  }

  cargarImagen(event: any) {
    const archivo = event.target.files[0];

    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        this.nuevaPrenda.imagen = lector.result as string;
      };
      lector.readAsDataURL(archivo);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/detalle-prenda/models/comentario.model';


@Component({
  selector: 'app-detalle-prenda',
  templateUrl: './detalle-prenda.page.html',
  styleUrls: ['./detalle-prenda.page.scss'],
  standalone:false
})
export class DetallePrendaPage implements OnInit {
  prenda: any;
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  nombreUsuario: string = '';

  prendas = [
    {
      id: 1,
      imagen: 'assets/img/polera1.jpeg',
      titulo: 'Polera negra',
      talla: 'M',
      tipo: 'Polera',
      estado: 'Como nueva',
      ubicacion: 'Santiago',
      precio: 5000,
      descripcion: 'Polera cómoda, casi sin uso.',
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
      descripcion: 'Jeans ajustado, muy cómodos.',
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
      descripcion: 'Chaqueta jeans estilo destroyed (desgastada) color celeste envejecido (opaco), esta impecable.',
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
      descripcion: 'Jumper de cotele burdeo talla s marca forever 21 tiene de largo 72 cms y de axila a axila 41 cms',
      publicadoPor: 'Admin'
    } 
    
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', id); // ← asegúrate de ver esto en consola
    this.prenda = this.prendas.find(p => p.id === id);
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';
  }
  agregarComentario() {
    if (this.nuevoComentario.trim()) {
      const comentario: Comentario = {
        autor: this.nombreUsuario,
        texto: this.nuevoComentario,
        fecha: new Date()
      };
      this.comentarios.push(comentario);
      this.nuevoComentario = '';
    }
  }
}


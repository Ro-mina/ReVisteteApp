import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Comentario } from '../models/comentario.model';
import { ServiciodbService } from 'services/serviciodb.service';
import { PrendaService } from '../services/prenda.service';
import { ComentarioService } from '../services/comentario.service';

@Component({
  selector: 'app-detalle-prenda',
  templateUrl: './detalle-prenda.page.html',
  styleUrls: ['./detalle-prenda.page.scss'],
  standalone: false
})
export class DetallePrendaPage implements OnInit {
  prenda: any;
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  nombreUsuario: string = '';
  usuarioLogeado = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuController,
    private dbService: ServiciodbService,
    private prendaService: PrendaService,
    private comentarioService: ComentarioService

  ) {}

    async ngOnInit() {
      this.usuarioLogeado = await this.dbService.estaLogeado();  
      console.log('¿Está logeado?:', this.usuarioLogeado);

      if (!this.usuarioLogeado) {
        console.warn(' Redirigiendo a login desde detalle-prenda');
        this.router.navigate(['/login']);
        return;
      }

      const id = Number(this.route.snapshot.paramMap.get('id'));
      console.log(' ID recibido:', id);

      const { value } = await Preferences.get({ key: 'nombreUsuario' });
      this.nombreUsuario = value || 'Invitado';

      this.prendaService.getPrendas().subscribe({
        next: (prendas) => {
          console.log(' Prendas cargadas desde API:', prendas);
          this.prenda = prendas.find(p => p.id === id);
          if (!this.prenda) {
            alert('Prenda no encontrada');
            this.router.navigate(['/home']);
          } else {
            this.obtenerComentarios(this.prenda.id);
          }
        },
        error: () => {
          alert('Error al cargar la prenda');
          this.router.navigate(['/home']);
        }
      });
    }

  obtenerComentarios(prendaId: number) {
    this.comentarioService.obtenerComentarios(prendaId).subscribe({
      next: (comentarios) => {
        this.comentarios = comentarios;
      },
      error: () => {
        console.warn('No se pudieron cargar los comentarios');
        this.comentarios = [];
      }
    });
  }

  async agregarComentario() {
    if (!this.nuevoComentario.trim() || !this.prenda) return;

    const { value } = await Preferences.get({ key: 'nombreUsuario' });
    const autor = value || 'Invitado';

    const comentario: Comentario = {
      autor,
      texto: this.nuevoComentario.trim(),
      fecha: new Date().toISOString(),
      prenda_id: this.prenda.id
    };


    this.comentarioService.agregarComentario(comentario).subscribe({
      next: (nuevoComentario) => {
        this.comentarios.push(nuevoComentario);
        this.nuevoComentario = '';
      },
      error: () => {
        alert('No se pudo guardar el comentario');
      }
    });
  }

  irA(ruta: string) {
    this.menu.close('menuLateral');
    this.router.navigate(['/' + ruta]);
  }

  cerrarSesion() {
    this.dbService.cerrarSesion();
    this.menu.close('menuLateral');
    this.router.navigate(['/login']);
  }
}
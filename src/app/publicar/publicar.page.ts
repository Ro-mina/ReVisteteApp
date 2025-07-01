import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Prenda } from '../models/prenda.model';
import { PrendaService } from '../services/prenda.service';
import { UsuarioService } from '../services/usuario.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
  standalone: false
})
export class PublicarPage implements OnInit {
  publicarForm!: FormGroup;
  nombreUsuario: string = '';
  imagenBase64: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private prendaService: PrendaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';

    this.publicarForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
      talla: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(100)]]
    });
  }

    async tomarFoto() {
      try {
        const image = await Camera.getPhoto({
          quality: 75,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera
        });

        this.imagenBase64 = image.dataUrl!;
      } catch (err) {
        console.error('Cámara cancelada o fallida');
      }
    }


  async publicarPrenda() {
    if (this.publicarForm.invalid || !this.imagenBase64) return;

    const usuario = await this.usuarioService.obtenerUsuario();

    const nuevaPrenda: Omit<Prenda, 'id'> = {
      ...this.publicarForm.value,
      imagen: this.imagenBase64,
      publicadoPor: usuario?.nombre || 'Invitado',
      usuario_id: usuario?.id
    };

    this.prendaService.publicarPrenda(nuevaPrenda).subscribe({
      next: async () => {
        // Guardar localmente para mostrar en modo offline
        const { value } = await Preferences.get({ key: 'prendas' });
        const prendasLocales = value ? JSON.parse(value) : [];
        prendasLocales.push(nuevaPrenda);
        await Preferences.set({ key: 'prendas', value: JSON.stringify(prendasLocales) });

        this.router.navigate(['/home']);
      },
      error: () => alert('Error al publicar')
    });
  }
}

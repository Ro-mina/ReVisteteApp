import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService, UsuarioRegistro } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class RegistroPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(3)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(3)]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const form = this.registerForm.value;
    const nuevoUsuario: UsuarioRegistro = {
      nombre: form.nombre.trim(),
      apellido_paterno: form.apellidoPaterno.trim(),
      apellido_materno: form.apellidoMaterno.trim(),
      correo: form.correo.trim(),
      contrasena: form.password.trim(),
      genero: form.genero,
      fecha_nacimiento: new Date(form.fechaNacimiento).toISOString().split('T')[0]
    };

    this.authService.register(nuevoUsuario).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Usuario registrado correctamente',
          duration: 2000,
          color: 'danger'
        });

        await toast.present();
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: async (err) => {
        console.error('Error en el registro', err);
        const toast = await this.toastCtrl.create({
          message: 'No se pudo registrar. ¿El correo ya está en uso?',
          duration: 2500,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
    irALogin() {
    if (this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }

}

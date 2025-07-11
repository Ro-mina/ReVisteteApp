import '@lottiefiles/lottie-player';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { AuthService, UsuarioRespuesta } from '../services/auth.service';
import { Preferences } from '@capacitor/preferences';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.verificarRedireccion();
    this.menuCtrl.enable(false, 'menuLateral'); 
    this.menuCtrl.close('menuLateral'); 
  }

  async verificarRedireccion() {
    const params = await firstValueFrom(this.route.queryParams);
    if (params['redirect']) {
      this.mostrarToast('Debes iniciar sesión para acceder.');
    }
  }

  login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const { correo, password } = this.formLogin.value;
    this.authService.login({ correo, contrasena: password }).subscribe({
      next: async (usuario: UsuarioRespuesta) => {
        await Preferences.set({
          key: 'usuario',
          value: JSON.stringify(usuario),
        });

        await Preferences.set({
          key: 'nombreUsuario',
          value: usuario.nombre,
        });

        if (this.router.url !== '/home') {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log('Código HTTP:', err?.status);
        console.log('Detalle:', err?.error);
        console.log('Mensaje completo:', JSON.stringify(err, null, 2));

        const mensaje = err?.error?.detail || 'No se pudo iniciar sesión. Verifica tus credenciales o conexión.';
        this.mostrarToast(mensaje, 'danger');
      },
    });
  }

  irARegistro() {
    if (this.router.url !== '/registro') {
      this.router.navigate(['/registro']);
    }
  }

  async mostrarToast(mensaje: string, color: string = 'medium') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color,
    });
    await toast.present();
  }
}

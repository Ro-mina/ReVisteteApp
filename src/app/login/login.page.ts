import '@lottiefiles/lottie-player';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsuarioRespuesta } from '../models/usuario.model';
import { Preferences } from '@capacitor/preferences';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    // Si fue redirigido, mostrar mensaje
    this.route.queryParams.subscribe(params => {
      if (params['redirect']) {
        this.mostrarToast('Debes iniciar sesión para acceder.');
      }
    });
  }

  login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const { correo, password } = this.formLogin.value;
    console.log('Credenciales enviadas:', { correo, contrasena: password });
    this.authService.login({ correo, contrasena: password }).subscribe({
      next: async (usuario: UsuarioRespuesta) => {
        await Preferences.set({
          key: 'usuario',
          value: JSON.stringify(usuario)
        });

        await Preferences.set({
          key: 'nombreUsuario',
          value: usuario.nombre
        });

        // Navegar solo si no estás ya en home
        if (this.router.url !== '/home') {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log(' Código HTTP:', err?.status);
        console.log(' Detalle:', err?.error);
        console.log(' Mensaje completo:', JSON.stringify(err, null, 2));

        if (err?.error?.detail) {
          alert(err.error.detail);
        } else {
          alert('No se pudo iniciar sesión. Verifica tu conexión o las credenciales.');
        }
      }
    });
  }

  irARegistro() {
    if (this.router.url !== '/registro') {
      this.router.navigate(['/registro']);
    }
  }  
  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: 'medium'
    });
    await toast.present();
  }

}

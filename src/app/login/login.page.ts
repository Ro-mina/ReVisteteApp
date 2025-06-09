import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage {
    loginForm = this.fb.group({
    identificador: ['', Validators.required], // puede ser nombre o email
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
    const id = this.loginForm.value.identificador?.toLowerCase() || '';

    // Buscar usuario por email o username
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find((u: any) =>
      u.email.toLowerCase() === id || u.nombreUsuario.toLowerCase() === id
    );

    if (usuarioEncontrado) {
      // Guardar el nombreUsuario real
      localStorage.setItem('nombreUsuario', usuarioEncontrado.nombreUsuario);
      this.router.navigate(['/home']);
    } else {
      // usuario no encontrado, mostrar error o mensaje
      alert('Usuario o email no encontrado');
    }
  } else {
    this.loginForm.markAllAsTouched();
    }
  }
    irAHome() {
    this.router.navigate(['/home']);
  }
}

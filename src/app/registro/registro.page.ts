import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

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
  nombreUsuario: string = ''; 

  registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(6)]],
    apellido: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fechaNacimiento: ['', Validators.required],
    genero: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const nuevoUsuario = {
        nombreUsuario: this.registerForm.value.nombre!,
        apellido: this.registerForm.value.apellido!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        fechaNacimiento: this.registerForm.value.fechaNacimiento!,
        genero: this.registerForm.value.genero!
      };

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      const existe = usuarios.find((u: any) =>
        u.email === nuevoUsuario.email || u.nombreUsuario === nuevoUsuario.nombreUsuario
      );

      if (existe) {
        alert('Ya existe un usuario con este email o nombre de usuario');
        return;
      }

      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      console.log('Usuario registrado:', nuevoUsuario);
      this.router.navigate(['/login']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
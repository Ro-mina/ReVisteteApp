import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validacion-publicacion',
  templateUrl: './validacion-publicacion.component.html',
  styleUrls: ['./validacion-publicacion.component.scss'],
  standalone: false
})
export class ValidacionPublicacionComponent {
  formulario = new FormGroup({
    nombreApp: new FormControl('ReVístete'),
    appId: new FormControl('com.revistete.app'),
    version: new FormControl('3.0.0'),
    correo: new FormControl('ro.torresg@duocuc.cl'),
    pais: new FormControl('Chile'),
    sdkMin: new FormControl('22'),
    sdkTarget: new FormControl('34'),

    // Booleanos bien tipados
    tieneAPK: new FormControl<boolean>(true),
    tieneAAB: new FormControl<boolean>(true),
    firmada: new FormControl<boolean>(true),
    pruebasUnitarias: new FormControl<boolean>(true),
    pruebasE2E: new FormControl<boolean>(true),

    plataforma: new FormControl('Android + Web'),
  });
}

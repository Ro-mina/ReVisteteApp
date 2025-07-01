export interface UsuarioRegistro {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  genero: string;
  correo: string;
  contrasena: string;
}

export interface UsuarioLogin {
  correo: string;
  contrasena: string;
}

export interface UsuarioRespuesta {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  genero: string;
  correo: string;
  token?: string; // opcional
}

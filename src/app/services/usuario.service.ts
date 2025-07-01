import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioKey = 'usuario';

  async guardarUsuario(usuario: any): Promise<void> {
    await Preferences.set({ key: this.usuarioKey, value: JSON.stringify(usuario) });
  }

  async obtenerUsuario(): Promise<any | null> {
    const { value } = await Preferences.get({ key: this.usuarioKey });
    return value ? JSON.parse(value) : null;
  }

  async borrarUsuario(): Promise<void> {
    await Preferences.remove({ key: this.usuarioKey });
  }
}

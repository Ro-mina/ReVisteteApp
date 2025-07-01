import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const { value } = await Preferences.get({ key: 'usuario' });

      if (value) {
        const usuario = JSON.parse(value);
        if (usuario && usuario.id) {
          console.log('AuthGuard: usuario válido', usuario);
          return true;
        }
      }

      console.warn('AuthGuard: acceso denegado, redirigiendo...');
      return this.router.createUrlTree(['/login'], {
        queryParams: { redirect: state.url }
      });

    } catch (error) {
      console.error('AuthGuard: error al leer Preferences', error);
      return this.router.createUrlTree(['/login'], {
        queryParams: { redirect: state.url }
      });
    }
  }
}

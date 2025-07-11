import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ValidacionPublicacionComponent } from './validacion-publicacion/validacion-publicacion.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },  
  {
    path: 'publicar',
    loadChildren: () => import('./publicar/publicar.module').then( m => m.PublicarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle-prenda/:id',
    loadChildren: () =>
    import('src/app/detalle-prenda/detalle-prenda.module').then(m => m.DetallePrendaPageModule),
    canActivate: [AuthGuard]
  },
  {
  path: 'mi-cuenta',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/mi-cuenta/mi-cuenta.module').then(m => m.MiCuentaPageModule)
    
  },
  {
  path: 'validacion-publicacion',
    component: ValidacionPublicacionComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

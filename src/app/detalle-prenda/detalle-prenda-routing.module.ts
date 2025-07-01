import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DetallePrendaPage } from './detalle-prenda.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePrendaPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePrendaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePrendaPage } from './detalle-prenda.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePrendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePrendaPageRoutingModule {}

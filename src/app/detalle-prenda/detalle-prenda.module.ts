import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePrendaPageRoutingModule } from './detalle-prenda-routing.module';

import { DetallePrendaPage } from './detalle-prenda.page';
import { ComponentsModule } from 'src/app/components/components.module'


@NgModule({  
  declarations: [DetallePrendaPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DetallePrendaPageRoutingModule
  ],
  
})
export class DetallePrendaPageModule {}

export interface Comentario {
  autor: string;
  texto: string;
  fecha: Date;
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetallePrendaPageRoutingModule } from './detalle-prenda-routing.module';
import { DetallePrendaPage } from './detalle-prenda.page';
import { HeaderComponent } from '../components/header/header.component';


@NgModule({  
  declarations: [DetallePrendaPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponent,
    DetallePrendaPageRoutingModule
  ],
  
})
export class DetallePrendaPageModule {}

export interface Comentario {
  autor: string;
  texto: string;
  fecha: Date;
}
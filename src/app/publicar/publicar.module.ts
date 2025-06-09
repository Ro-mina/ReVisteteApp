import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicarPageRoutingModule } from './publicar-routing.module';

import { PublicarPage } from './publicar.page';
import { ComponentsModule } from 'src/app/components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PublicarPageRoutingModule
  ],
  declarations: [PublicarPage]
})
export class PublicarPageModule {}

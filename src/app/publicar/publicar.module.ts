import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PublicarPageRoutingModule } from './publicar-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicarPage } from './publicar.page';
import { HeaderComponent } from '../components/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponent,
    PublicarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PublicarPage]
})
export class PublicarPageModule {}

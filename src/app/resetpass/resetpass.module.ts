import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { ResetpassPageRoutingModule } from './resetpass-routing.module';
import { ResetpassPage } from './resetpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agrega ReactiveFormsModule aquí
    IonicModule,
    ResetpassPageRoutingModule
  ],
  declarations: [ResetpassPage]
})
export class ResetpassPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookprogressPageRoutingModule } from './bookprogress-routing.module';
import { BookprogressPage } from './bookprogress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, // Incluye ReactiveFormsModule aquí también
    BookprogressPageRoutingModule
  ],
  declarations: [BookprogressPage]
})
export class BookprogressPageModule {}
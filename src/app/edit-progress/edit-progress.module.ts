import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {  ReactiveFormsModule } from '@angular/forms';

import { EditProgressPageRoutingModule } from './edit-progress-routing.module';

import { EditProgressPage } from './edit-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditProgressPageRoutingModule
  ],
  declarations: [EditProgressPage]
})
export class EditProgressPageModule {}

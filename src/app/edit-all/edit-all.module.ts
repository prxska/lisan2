import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAllPageRoutingModule } from './edit-all-routing.module';

import { EditAllPage } from './edit-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAllPageRoutingModule
  ],
  declarations: [EditAllPage]
})
export class EditAllPageModule {}

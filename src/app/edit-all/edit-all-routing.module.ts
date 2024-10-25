import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAllPage } from './edit-all.page';

const routes: Routes = [
  {
    path: '',
    component: EditAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAllPageRoutingModule {}

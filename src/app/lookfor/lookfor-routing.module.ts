import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LookforPage } from './lookfor.page';

const routes: Routes = [
  {
    path: '',
    component: LookforPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookforPageRoutingModule {}

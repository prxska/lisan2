import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookprogressPage } from './bookprogress.page';

const routes: Routes = [
  {
    path: '',
    component: BookprogressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookprogressPageRoutingModule {}

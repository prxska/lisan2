import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'bookprogress',
    loadChildren: () => import('./bookprogress/bookprogress.module').then(m => m.BookprogressPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'edit-progress/:bookTitle',
    loadChildren: () => import('./edit-progress/edit-progress.module').then(m => m.EditProgressPageModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetpassPageModule)
  },
  {
    path: 'lookfor',
    loadChildren: () => import('./lookfor/lookfor.module').then(m => m.LookforPageModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'edit-all',
    loadChildren: () => import('./edit-all/edit-all.module').then(m => m.EditAllPageModule),
    canActivate: [AuthGuard]  
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

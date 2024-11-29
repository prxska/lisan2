import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de que el path sea correcto
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const user = localStorage.getItem('usuario');
  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
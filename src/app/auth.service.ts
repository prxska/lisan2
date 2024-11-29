// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // Aquí puedes agregar métodos para autenticar a un usuario
  login(username: string, password: string) {
    // Lógica para iniciar sesión
  }

  logout() {
    // Lógica para cerrar sesión
  }
}
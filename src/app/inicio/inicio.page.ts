import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombreUsuario: string = '';

  constructor() { }

  ngOnInit() {
    this.obtenerNombreUsuario();
  }

  obtenerNombreUsuario() {
    const storedValue = localStorage.getItem('usuario');
    if (storedValue) {
      try {
        const usuario = JSON.parse(storedValue);
        this.nombreUsuario = usuario.nombre;
      } catch (error) {
        console.error('Error al analizar JSON de localStorage:', error);
      }
    }
  }
}


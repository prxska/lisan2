import { Component, OnInit } from '@angular/core';
import { BookProgressService } from '../book-progress.service'; // Asegúrate de que la ruta sea correcta
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements ViewWillEnter {
  nombreUsuario: string = '';
  books: any[] = [];

  constructor(private bookProgressService: BookProgressService) {}

  ionViewWillEnter() {
    this.obtenerNombreUsuario();
    this.obtenerLibros();
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

  obtenerLibros() {
    this.books = this.bookProgressService.getProgress();
    this.books.forEach(book => {
      book.percentage = book.totalPages > 0 ? (book.pagesRead / book.totalPages) * 100 : 0;
    });
    console.log('Libros obtenidos:', this.books); // Para depuración
  }
}
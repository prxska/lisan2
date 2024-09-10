import { Component, OnInit } from '@angular/core';
import { BookProgressService } from '../book-progress.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Para redirigir al formulario de edición
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements ViewWillEnter {
  nombreUsuario: string = '';
  books: any[] = [];

  constructor(private bookProgressService: BookProgressService, private router: Router) {}

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

  // Función para marcar el libro como "Leído" y actualizar el progreso al 100%
  toggleRead(book: any) {
    if (book.read) {
      book.pagesRead = book.totalPages;
      book.percentage = 100;
    } else {
      // Si desmarca "Leído", se puede devolver el progreso al estado anterior
      book.pagesRead = Math.min(book.pagesRead, book.totalPages);
      book.percentage = (book.pagesRead / book.totalPages) * 100;
    }
    this.bookProgressService.saveProgress(book); // Usa saveProgress en lugar de updateProgress
  }

  // Redirige a la página de edición para cambiar el progreso del libro
  editarProgreso(book: any) {
    this.router.navigate(['/edit-progress', book.bookTitle]);
  }
  
  eliminarLibro(bookTitle: string) {
    this.bookProgressService.deleteBook(bookTitle);
    this.obtenerLibros(); // Refresca la lista de libros
  }
}

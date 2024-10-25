import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookProgressService } from '../book-progress.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  nombreUsuario: string = '';
  books: any[] = [];

  constructor(
    private bookProgressService: BookProgressService, 
    private router: Router,
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.obtenerNombreUsuario();
    this.obtenerLibros();
  }

  obtenerNombreUsuario() {
    const storedValue = localStorage.getItem('usuario');
    if (storedValue) {
      try {
        const usuario = JSON.parse(storedValue);
        this.nombreUsuario = usuario.nombre;  // Obtiene el nombre del usuario del localStorage
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
    console.log('Libros obtenidos:', this.books);
  }

  navigateToLogin() {
    localStorage.removeItem('usuario'); // Da la orden de borrar al usuario automaticamente al salir 
    this.router.navigate(['/login']); // Redirige al login
  }
  
  toggleRead(book: any) {
    if (book.read) {
      book.pagesRead = book.totalPages;
      book.percentage = 100;
    } else {
      book.pagesRead = Math.min(book.pagesRead, book.totalPages);
      book.percentage = (book.pagesRead / book.totalPages) * 100;
    }
    this.bookProgressService.saveProgress(book);
  }

  editarProgreso(book: any) {
    this.router.navigate(['/edit-progress', book.bookTitle]);
  }

  eliminarLibro(bookTitle: string) {
    this.bookProgressService.deleteBook(bookTitle);
    this.obtenerLibros();
  }

  // Métodos de navegación para el tab bar
  edit() {
    this.router.navigate(['/edit-all']);
  }

  goToBookProgress() {
    this.router.navigate(['/bookprogress']);
  }

  goToLookFor() {
    this.router.navigate(['/lookfor']);
  }


}

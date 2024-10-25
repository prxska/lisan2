import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookProgressService } from '../book-progress.service';

@Component({
  selector: 'app-edit-all',
  templateUrl: './edit-all.page.html',
  styleUrls: ['./edit-all.page.scss'],
})
export class EditAllPage {
  nombreUsuario: string = '';
  books: any[] = [];

  constructor(
    private bookProgressService: BookProgressService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this.books = this.bookProgressService.getProgress();
    this.books.forEach(book => {
      book.percentage = book.totalPages > 0 ? (book.pagesRead / book.totalPages) * 100 : 0;
    });
    console.log('Libros obtenidos:', this.books);
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
    this.obtenerLibros(); // Actualiza la lista de libros después de la eliminación
  }
}

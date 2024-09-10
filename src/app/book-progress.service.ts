import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookProgressService {
  private storageKey = 'bookProgress';

  constructor() { }

  // Guardar datos en el almacenamiento local
  saveProgress(newBook: any) {
    let books = this.getProgress();
    if (!Array.isArray(books)) {
      books = [];
    }

    const existingBookIndex = books.findIndex((book: any) => book.bookTitle === newBook.bookTitle);

    if (existingBookIndex !== -1) {
      // Actualizar libro existente
      books[existingBookIndex] = newBook;
    } else {
      // Añadir nuevo libro
      books.push(newBook);
    }

    // Guardar en localStorage
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(books));
    } catch (error) {
      console.error('Error al guardar el progreso del libro:', error);
    }
  }

  // Recuperar datos del almacenamiento local
  getProgress(): any[] {
    const progress = localStorage.getItem(this.storageKey);
    try {
      const books = progress ? JSON.parse(progress) : [];
      return Array.isArray(books) ? books : [];
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      return [];
    }
  }

  // Eliminar un libro del almacenamiento local
  deleteBook(bookTitle: string) {
    let books = this.getProgress();
    books = books.filter((book: any) => book.bookTitle !== bookTitle);
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(books));
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
    }
  }

  // Reiniciar todo el progreso eliminando todos los libros
  clearAllProgress() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Error al eliminar todos los libros:', error);
    }
  }
}

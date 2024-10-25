import { Component } from '@angular/core';
import { BookService } from '../services/book.service'; // Asegúrate de tener el servicio creado

@Component({
  selector: 'app-lookfor',
  templateUrl: './lookfor.page.html',
  styleUrls: ['./lookfor.page.scss'],
})
export class LookforPage {
  searchQuery: string = '';
  books: any[] = [];
  loading: boolean = false;

  constructor(private bookService: BookService) {}

  searchBooks() {
    if (this.searchQuery.trim() === '') {
      return;
    }

    this.loading = true;
    this.bookService.searchBooks(this.searchQuery).subscribe(
      (data) => {
        this.books = data.docs;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }
}

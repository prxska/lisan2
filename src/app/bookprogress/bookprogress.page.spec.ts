import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookprogressPage } from './bookprogress.page';
import { BookService } from '../services/book.service';

class MockBookService {
  saveReadingProgress(bookName: string, progress: number) {

    console.log('se guarda avance de lectura');
  }

  saveBookName(bookName: string) {

    console.log('se guarda el nombre del libro');
  }
}

describe('BookprogressPage', () => {
  let component: BookprogressPage;
  let fixture: ComponentFixture<BookprogressPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookprogressPage],
      providers: [{ provide: BookService, useClass: MockBookService }] // Mock del servicio BookService
    });

    fixture = TestBed.createComponent(BookprogressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should save reading progress', () => {
    const bookName = 'El Quijote';
    const progress = 50;

 
    const bookService = TestBed.inject(MockBookService);
    spyOn(bookService, 'saveReadingProgress').and.callThrough();
    component.saveProgress(bookName, progress);

    expect(bookService.saveReadingProgress).toHaveBeenCalledWith(bookName, progress);
    console.log('se guarda avance de lectura');
  });

  it('should save the book name', () => {
    const bookName = 'El Quijote';

    const bookService = TestBed.inject(MockBookService);
    spyOn(bookService, 'saveBookName').and.callThrough();
    component.saveBookName(bookName);

    expect(bookService.saveBookName).toHaveBeenCalledWith(bookName);
    console.log('se guarda el nombre del libro');
  });
});
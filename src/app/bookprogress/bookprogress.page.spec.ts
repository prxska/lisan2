import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookprogressPage } from './bookprogress.page';

describe('BookprogressPage', () => {
  let component: BookprogressPage;
  let fixture: ComponentFixture<BookprogressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookprogressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

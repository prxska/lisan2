import { TestBed } from '@angular/core/testing';

import { BookProgressService } from './book-progress.service';

describe('BookProgressService', () => {
  let service: BookProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

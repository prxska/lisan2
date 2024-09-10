import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookProgressService } from '../book-progress.service';

@Component({
  selector: 'app-edit-progress',
  templateUrl: './edit-progress.page.html',
  styleUrls: ['./edit-progress.page.scss'],
})
export class EditProgressPage implements OnInit {
  bookProgressForm: FormGroup;
  book: any;

  constructor(
    private fb: FormBuilder,
    private bookProgressService: BookProgressService,
    private route: ActivatedRoute
  ) {
    this.bookProgressForm = this.fb.group({
      pagesRead: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    const bookTitle = decodeURIComponent(this.route.snapshot.paramMap.get('bookTitle') || '');
    this.book = this.bookProgressService.getProgress().find(b => b.bookTitle === bookTitle);
    if (this.book) {
      this.bookProgressForm.patchValue({
        pagesRead: this.book.pagesRead
      });
    }
  }

  onSubmit() {
    if (this.bookProgressForm.valid) {
      const updatedPagesRead = this.bookProgressForm.value.pagesRead;
      this.book.pagesRead = updatedPagesRead;
      this.book.percentage = (updatedPagesRead / this.book.totalPages) * 100;
      this.bookProgressService.saveProgress(this.book);
    }
  }
}

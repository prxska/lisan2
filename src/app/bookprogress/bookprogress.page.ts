import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookProgressService } from '../book-progress.service'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-bookprogress',
  templateUrl: './bookprogress.page.html',
  styleUrls: ['./bookprogress.page.scss'],
})
export class BookprogressPage implements OnInit {
  bookProgressForm: FormGroup;
  percentage: number | null = null;
  bookTitle: string | null = null;

  constructor(private fb: FormBuilder, private bookProgressService: BookProgressService) {
    this.bookProgressForm = this.fb.group({
      bookTitle: ['', Validators.required],
      totalPages: [null, [Validators.required, Validators.min(1)]],
      pagesRead: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.bookProgressForm.valid) {
      const formData = this.bookProgressForm.value;
      this.bookProgressService.saveProgress(formData);
      this.bookTitle = formData.bookTitle;
      if (formData.totalPages > 0) {
        this.percentage = (formData.pagesRead / formData.totalPages) * 100;
      } else {
        this.percentage = 0;
      }
    }
  }
}
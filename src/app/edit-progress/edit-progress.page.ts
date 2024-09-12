import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookProgressService } from '../book-progress.service';
import { AlertController } from '@ionic/angular';

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
    private route: ActivatedRoute,
    private  router: Router,
    private alertController: AlertController
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

  async onSubmit() {
    if (this.bookProgressForm.valid) {
      const updatedPagesRead = this.bookProgressForm.value.pagesRead;
      this.book.pagesRead = updatedPagesRead;
      this.book.percentage = (updatedPagesRead / this.book.totalPages) * 100;
      this.bookProgressService.saveProgress(this.book);
      
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'El progreso ha sido actualizado.',
        buttons: [{
          text: 'Aceptar',
        handler: () => {
          this.router.navigate(['/inicio']);
        }}]
      });
      await alert.present();
    }
  }
}

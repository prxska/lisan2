import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookProgressService } from '../book-progress.service'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bookprogress',
  templateUrl: './bookprogress.page.html',
  styleUrls: ['./bookprogress.page.scss'],
})
export class BookprogressPage implements OnInit {
  bookProgressForm: FormGroup;
  percentage: number | null = null;
  bookTitle: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private bookProgressService: BookProgressService,
    public alertController: AlertController
  ) {
    this.bookProgressForm = this.fb.group({
      bookTitle: ['', Validators.required],
      totalPages: [null, [Validators.required, Validators.min(1)]],
      pagesRead: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.bookProgressForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor completa todos los campos.',
        buttons: [{
          text: 'Aceptar',
          cssClass: 'custom-alert-button' // Clase personalizada para el botón
        }],
        cssClass: 'custom-alert' // Clase personalizada para el alert completo
      });
      await alert.present();
      return;
    }
    
    const formData = this.bookProgressForm.value;
    this.bookProgressService.saveProgress(formData);
    this.bookTitle = formData.bookTitle;
  
    if (formData.totalPages > 0) {
      this.percentage = (formData.pagesRead / formData.totalPages) * 100;
    } else {
      this.percentage = 0;
    }
  
    // Mostrar alerta de éxito personalizada
    const successAlert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Éxito',
      message: 'Progreso guardado exitosamente',
      buttons: [{
        text: 'Aceptar',
        cssClass: 'custom-alert-button'
      }]
    });
    await successAlert.present();
  
    // Limpiar el formulario
    this.bookProgressForm.reset();
    this.percentage = null;
  }
}
  	
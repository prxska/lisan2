import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {
  resetPasswordForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private alertController: AlertController) {
    this.resetPasswordForm = this.fb.group({
      nombre: ['', Validators.required], // Campo para nombre de usuario
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async resetPassword() {
    if (this.resetPasswordForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor completa todos los campos correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const formData = this.resetPasswordForm.value;

    if (formData.newPassword !== formData.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // se trabajara con la misma logica de variables que se usa para registrar a un usuario
    // se puede usar el servicio de autenticacion para resetear la contraseña

    const storedUserString = localStorage.getItem('usuario');
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      if (storedUser && storedUser.nombre === formData.nombre) {
        // aqui pasara la nueva contrasenia asignada a tomar lugar en el array 
        storedUser.password = formData.newPassword;
        localStorage.setItem('usuario', JSON.stringify(storedUser));

        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Tu contraseña ha sido restablecida.',
          buttons: ['Aceptar']
        });
        console.log('Usuario actualizado:', localStorage.getItem('usuario'));
        console.log('Datos del formulario:', formData);
        await alert.present();
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Nombre de usuario no encontrado.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se encontró ningún usuario.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }

    // aqui se limpia los input
    this.resetPasswordForm.reset();
  }
}

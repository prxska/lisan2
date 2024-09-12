import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  showPassword: boolean = false;
  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, 
    public alertController: AlertController,
    private router: Router)
  {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'confirmacionPassword': new FormControl('', Validators.required)
      
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {}

  async guardar() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    var usuario = {
      nombre: f.nombre,
      password: f.password
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Usuario registrado.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
      this.router.navigate(['/login'])
        }}]
    });
    await alert.present();

    this.formularioRegistro.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';  // traemos al Router para su a posteriori uso 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword: boolean = false;
  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router  // se usa aqui la inyeccion de router
  ) { 
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  

  ngOnInit() {
    // aqui se limpiara el formulario cada vez que se limpiara
    this.formularioLogin.reset();
  }

  async ingresar() {
    const f = this.formularioLogin.value;
  
    const storedValue = localStorage.getItem('usuario');
    let usuario: { nombre: string, password: string } | null = null;
  
    if (storedValue) {
      try {
        usuario = JSON.parse(storedValue);
      } catch (error) {
        console.error('Error al analizar JSON de localStorage:', error);
      }
    }
  
    if (usuario && usuario.nombre === f.nombre && usuario.password === f.password) {
      console.log('Ingresado');
      // con esto el localstorage lo recordara.
      localStorage.setItem('usuario', JSON.stringify({ nombre: f.nombre, password: f.password }));
      this.router.navigate(['/inicio']);
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }
  }
}
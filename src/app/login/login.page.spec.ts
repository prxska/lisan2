import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';

// Mock del servicio AuthService
class MockAuthService {
  login() {
    return of(true);  // Simula un inicio de sesión exitoso
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: MockAuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },  // Mock del Router
        { provide: AuthService, useClass: MockAuthService }
      ]
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    AuthService = TestBed.inject(AuthService);  // Obtener instancia del servicio mockeado
    router = TestBed.inject(Router);  // Obtener instancia del router mockeado
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Inicia sesión exitosamente" when login is successful', () => {
    // Simula la acción de login
    component.login();  // Asegúrate de que el método login esté invocado correctamente
    fixture.detectChanges();  // Detecta los cambios

    // Verifica que el mensaje de inicio de sesión exitoso sea el esperado
    expect(component.loginMessage).toBe('Inicia sesión exitosamente');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);  // Verifica si la navegación al home ocurrió
  });
});
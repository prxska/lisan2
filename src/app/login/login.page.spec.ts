import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';


class MockAuthService {
  login() {
    return of(true);  
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
    AuthService = TestBed.inject(AuthService);  
    router = TestBed.inject(Router);  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Inicia sesión exitosamente" when login is successful', () => {
    
    component.login();  
    fixture.detectChanges();  

    
    expect(component.loginMessage).toBe('Inicia sesión exitosamente');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);  
  });
});
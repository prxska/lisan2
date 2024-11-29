import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';


class MockAuthService {
  register(userData: { username: string, password: string }) {

    return of(true);
  }
}

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      providers: [{ provide: AuthService, useClass: MockAuthService }] 
    });

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
    console.log('should create'); 
  });

  
  it('should save user in localStorage after successful registration', () => {
    const userData = { username: 'testuser', password: 'password123' };

    
    spyOn(localStorage, 'setItem');  
    component.register(userData);

    
    expect(localStorage.setItem).toHaveBeenCalledWith('usuario', JSON.stringify(userData));
    console.log('usuario se guarda en localStorage');
  });

  
  it('should not allow duplicate username', () => {
    
    const existingUserData = { username: 'testuser', password: 'password123' };
    localStorage.setItem('usuario', JSON.stringify(existingUserData));  
    const newUserData = { username: 'testuser', password: 'newpassword' };
    component.register(newUserData);  

   
    expect(component.registerMessage).toBe('El nombre de usuario ya está en uso');
    console.log('no permite nombre de usuario repetido');
  });
});
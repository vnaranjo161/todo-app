import { Component, input, output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginPage } from './login.page';
import { AuthService } from '../../core/services/auth-service.service';
import { NotificationService } from '../../core/services/notification.service';
import { LoginRequest } from '../../core/shared/models/auth.model';

@Component({ selector: 'app-login-form', template: '', standalone: true })
class LoginFormStub {
  loading = input<boolean>(false);
  formSubmit = output<LoginRequest>();
}

const mockFormData = { email: 'juan@email.com', password: 'password123' } as unknown as LoginRequest;

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;
  let authService: { login: jest.Mock };
  let notificationService: { show: jest.Mock };
  let router: { navigate: jest.Mock };

  beforeEach(async () => {
    authService = { login: jest.fn() };
    notificationService = { show: jest.fn() };
    router = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: NotificationService, useValue: notificationService },
        { provide: Router, useValue: router },
      ],
    }).overrideComponent(LoginPage, {
      set: { imports: [LoginFormStub] },
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth.login with the submitted form data', () => {
    authService.login.mockReturnValue(of({ token: 'tk', name: 'Juan', userId: '1' }));
    component.onSubmit(mockFormData);
    expect(authService.login).toHaveBeenCalledWith(mockFormData);
  });

  it('should navigate to /home on successful login', () => {
    authService.login.mockReturnValue(of({ token: 'tk', name: 'Juan', userId: '1' }));
    component.onSubmit(mockFormData);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show success notification on successful login', () => {
    authService.login.mockReturnValue(of({ token: 'tk', name: 'Juan', userId: '1' }));
    component.onSubmit(mockFormData);
    expect(notificationService.show).toHaveBeenCalledWith('Bienvenido', 'success');
  });

  it('should set loading to false after successful login', () => {
    authService.login.mockReturnValue(of({ token: 'tk', name: 'Juan', userId: '1' }));
    component.onSubmit(mockFormData);
    expect(component.loading).toBe(false);
  });

  it('should show error notification when login fails', () => {
    authService.login.mockReturnValue(throwError(() => new Error('Credenciales incorrectas')));
    component.onSubmit(mockFormData);
    expect(notificationService.show).toHaveBeenCalledWith('Credenciales incorrectas', 'error');
  });

  it('should set loading to false on login error', () => {
    authService.login.mockReturnValue(throwError(() => new Error('Error')));
    component.onSubmit(mockFormData);
    expect(component.loading).toBe(false);
  });
});

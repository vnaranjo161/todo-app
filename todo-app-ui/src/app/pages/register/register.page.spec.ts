import { Component, input, output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterPage } from './register.page';
import { AuthService } from '../../core/services/auth-service.service';
import { NotificationService } from '../../core/services/notification.service';
import { UserRegisterRequest } from '../../core/shared/models/auth.model';

@Component({ selector: 'app-register-form', template: '', standalone: true })
class RegisterFormStub {
  loading = input<boolean>(false);
  formSubmit = output<UserRegisterRequest>();
}

const mockFormData: UserRegisterRequest = {
  name: 'Juan Perez',
  email: 'juan@email.com',
  pasword: 'password123',
};

describe('RegisterPage', () => {
  let fixture: ComponentFixture<RegisterPage>;
  let component: RegisterPage;
  let authService: { register: jest.Mock };
  let notificationService: { show: jest.Mock };
  let router: { navigate: jest.Mock };

  beforeEach(async () => {
    authService = { register: jest.fn() };
    notificationService = { show: jest.fn() };
    router = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: NotificationService, useValue: notificationService },
        { provide: Router, useValue: router },
      ],
    }).overrideComponent(RegisterPage, {
      set: { imports: [RegisterFormStub] },
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth.register with the submitted form data', () => {
    authService.register.mockReturnValue(of({ token: 'tk', name: 'Juan', userId: '1' }));
    component.onSubmit(mockFormData);
    expect(authService.register).toHaveBeenCalledWith(mockFormData);
  });

  it('should navigate to /home on successful registration', () => {
    authService.register.mockReturnValue(of({ token: 'tk', name: 'Juan', userId: '1' }));
    component.onSubmit(mockFormData);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show success notification on successful registration', () => {
    authService.register.mockReturnValue(of({ token: 'tk', name: 'Juan', userId: '1' }));
    component.onSubmit(mockFormData);
    expect(notificationService.show).toHaveBeenCalledWith('Usuario registrado de manera exitosa', 'success');
  });

  it('should set loading to false after successful registration', () => {
    authService.register.mockReturnValue(of({ token: 'tk', name: 'Juan', userId: '1' }));
    component.onSubmit(mockFormData);
    expect(component.loading).toBe(false);
  });

  it('should show error notification when registration fails', () => {
    authService.register.mockReturnValue(throwError(() => new Error('El correo ya está registrado')));
    component.onSubmit(mockFormData);
    expect(notificationService.show).toHaveBeenCalledWith('El correo ya está registrado', 'error');
  });

  it('should set loading to false on registration error', () => {
    authService.register.mockReturnValue(throwError(() => new Error('Error')));
    component.onSubmit(mockFormData);
    expect(component.loading).toBe(false);
  });
});

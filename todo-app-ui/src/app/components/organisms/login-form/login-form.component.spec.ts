import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { LoginRequest } from '../../../core/shared/models/auth.model';

@Component({ selector: 'app-form-field', template: '', standalone: true })
class FormFieldStub {
  label = input.required<string>();
  inputId = input.required<string>();
  inputType = input<string>('text');
  placeholder = input<string>('');
  control = input<FormControl>(new FormControl(''));
  patternError = input<string>('');
}

@Component({ selector: 'app-button', template: '', standalone: true })
class ButtonStub {
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
}

describe('LoginFormComponent', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let component: LoginFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
    }).overrideComponent(LoginFormComponent, {
      set: { imports: [ReactiveFormsModule, FormFieldStub, ButtonStub] },
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form by default', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should not emit formSubmit when the form is invalid', () => {
    const handler = jest.fn();
    component.formSubmit.subscribe(handler);
    component.submit();
    expect(handler).not.toHaveBeenCalled();
  });

  it('should mark all controls as touched when submitting an invalid form', () => {
    component.submit();
    expect(component.form.controls.email.touched).toBe(true);
    expect(component.form.controls.password.touched).toBe(true);
  });

  it('should emit formSubmit with form values when the form is valid', () => {
    const handler = jest.fn();
    component.formSubmit.subscribe(handler);

    component.form.setValue({ email: 'juan@email.com', password: 'password123' });
    component.submit();

    expect(handler).toHaveBeenCalledWith<[LoginRequest]>({
      email: 'juan@email.com',
      password: 'password123',
    } as unknown as LoginRequest);
  });

  it('should fail validation for invalid email format', () => {
    component.form.controls.email.setValue('not-an-email');
    expect(component.form.controls.email.hasError('email')).toBe(true);
  });

  it('should fail validation when password is empty', () => {
    component.form.controls.password.setValue('');
    expect(component.form.controls.password.hasError('required')).toBe(true);
  });
});

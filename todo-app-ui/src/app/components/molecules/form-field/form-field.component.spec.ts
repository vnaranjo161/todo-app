import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';

@Component({ selector: 'app-label', template: '', standalone: true })
class LabelStub {
  inputId = input.required<string>();
  label = input.required<string>();
}

@Component({ selector: 'app-input', template: '', standalone: true })
class InputStub {
  id = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  control = input<FormControl>(new FormControl(''));
}

describe('FormFieldComponent', () => {
  let fixture: ComponentFixture<FormFieldComponent>;
  let component: FormFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent],
    }).overrideComponent(FormFieldComponent, {
      set: { imports: [LabelStub, InputStub] },
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Campo');
    fixture.componentRef.setInput('inputId', 'campo-id');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show required error when control is touched and empty', () => {
    const control = new FormControl('', Validators.required);
    fixture.componentRef.setInput('control', control);
    control.markAsTouched();
    fixture.detectChanges();
    const error: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(error.textContent).toContain('Este campo es obligatorio');
  });

  it('should show pattern error with the provided message', () => {
    const control = new FormControl('123', [Validators.required, Validators.pattern('[A-Za-z]+')]);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('patternError', 'Solo letras permitidas');
    control.markAsTouched();
    fixture.detectChanges();
    const error: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(error.textContent).toContain('Solo letras permitidas');
  });

  it('should show minlength error with the required length', () => {
    const control = new FormControl('ab', [Validators.minLength(8)]);
    fixture.componentRef.setInput('control', control);
    control.markAsTouched();
    fixture.detectChanges();
    const error: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(error.textContent).toContain('8');
  });

  it('should show email error for invalid email', () => {
    const control = new FormControl('no-es-email', [Validators.email]);
    fixture.componentRef.setInput('control', control);
    control.markAsTouched();
    fixture.detectChanges();
    const error: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(error.textContent).toContain('correo electrónico válido');
  });

  it('should not show any error when control is valid', () => {
    const control = new FormControl('valid@email.com', [Validators.required, Validators.email]);
    fixture.componentRef.setInput('control', control);
    control.markAsTouched();
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('span');
    expect(error).toBeNull();
  });
});

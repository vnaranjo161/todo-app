import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'test-input');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default type "text"', () => {
    expect(component.type()).toBe('text');
  });

  it('should have empty placeholder by default', () => {
    expect(component.placeholder()).toBe('');
  });

  it('should set the id attribute on the input element', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.id).toBe('test-input');
  });

  it('should apply error styles when control is touched and invalid', () => {
    const control = new FormControl('', Validators.required);
    fixture.componentRef.setInput('control', control);
    control.markAsTouched();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.classList.contains('border-red-400')).toBe(true);
  });

  it('should apply normal styles when control is valid', () => {
    const control = new FormControl('valid value');
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.classList.contains('border-gray-300')).toBe(true);
  });
});

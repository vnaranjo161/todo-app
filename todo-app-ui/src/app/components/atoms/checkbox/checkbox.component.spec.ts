import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxComponent>;
  let component: CheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'task-1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the input as checked when checked input is true', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.checked).toBe(true);
  });

  it('should emit false when changing a checked checkbox', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();

    const handler = jest.fn();
    component.change.subscribe(handler);

    fixture.nativeElement.querySelector('input').dispatchEvent(new Event('change'));

    expect(handler).toHaveBeenCalledWith(false);
  });

  it('should emit true when changing an unchecked checkbox', () => {
    fixture.componentRef.setInput('checked', false);
    fixture.detectChanges();

    const handler = jest.fn();
    component.change.subscribe(handler);

    fixture.nativeElement.querySelector('input').dispatchEvent(new Event('change'));

    expect(handler).toHaveBeenCalledWith(true);
  });
});

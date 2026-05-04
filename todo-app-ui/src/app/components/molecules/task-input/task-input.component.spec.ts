import { Component, input, output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskInputComponent } from './task-input.component';

@Component({ selector: 'app-input', template: '<input />', standalone: true })
class InputStub {
  id = input.required<string>();
  placeholder = input<string>('');
  control = input<any>();
}

@Component({ selector: 'app-button', template: '<button type="submit">Agregar</button>', standalone: true })
class ButtonStub {
  type = input<string>('button');
  disabled = input<boolean>(false);
}

describe('TaskInputComponent', () => {
  let fixture: ComponentFixture<TaskInputComponent>;
  let component: TaskInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInputComponent],
    }).overrideComponent(TaskInputComponent, {
      set: { imports: [InputStub, ButtonStub] },
    }).compileComponents();

    fixture = TestBed.createComponent(TaskInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit create and reset control on submit with valid input', () => {
    const handler = jest.fn();
    component.create.subscribe(handler);

    component.control.setValue('Nueva tarea');
    component.submit();

    expect(handler).toHaveBeenCalledWith('Nueva tarea');
    expect(component.control.value).toBeNull();
  });

  it('should not emit create when input is empty', () => {
    const handler = jest.fn();
    component.create.subscribe(handler);

    component.control.setValue('');
    component.submit();

    expect(handler).not.toHaveBeenCalled();
  });

  it('should not emit create when creating is true', () => {
    const handler = jest.fn();
    component.create.subscribe(handler);

    fixture.componentRef.setInput('creating', true);
    component.control.setValue('Nueva tarea');
    component.submit();

    expect(handler).not.toHaveBeenCalled();
  });
});

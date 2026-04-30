import { Component, input, output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../../core/shared/models/task.model';

@Component({ selector: 'app-checkbox', template: '', standalone: true })
class CheckboxStub {
  id = input.required<string>();
  checked = input<boolean>(false);
  change = output<boolean>();
}

@Component({ selector: 'app-icon-button', template: '', standalone: true })
class IconButtonStub {}

const mockTask: Task = { taskId: '1', description: 'Tarea de prueba', check: false };

describe('TaskItemComponent', () => {
  let fixture: ComponentFixture<TaskItemComponent>;
  let component: TaskItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
    }).overrideComponent(TaskItemComponent, {
      set: { imports: [CheckboxStub, IconButtonStub] },
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggle with taskId and new check value when checkbox changes', () => {
    const handler = jest.fn();
    component.toggle.subscribe(handler);

    fixture.debugElement
      .query(By.directive(CheckboxStub))
      .triggerEventHandler('change', true);

    expect(handler).toHaveBeenCalledWith({ taskId: '1', check: true });
  });
});

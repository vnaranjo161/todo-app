import { Component, input, output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { Task } from '../../../core/shared/models/task.model';

@Component({ selector: 'app-task-item', template: '', standalone: true })
class TaskItemStub {
  task = input.required<Task>();
  toggle = output<{ taskId: string; check: boolean }>();
}

const mockTasks: Task[] = [
  { taskId: '1', description: 'Primera tarea', check: false },
  { taskId: '2', description: 'Segunda tarea', check: true },
];

describe('TaskListComponent', () => {
  let fixture: ComponentFixture<TaskListComponent>;
  let component: TaskListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    }).overrideComponent(TaskListComponent, {
      set: { imports: [TaskItemStub] },
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tasks', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading message when loading is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Cargando tareas');
  });

  it('should show empty message when tasks list is empty', () => {
    fixture.componentRef.setInput('tasks', []);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No hay tareas');
  });

  it('should render one task item per task', () => {
    fixture.componentRef.setInput('tasks', mockTasks);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('app-task-item');
    expect(items.length).toBe(2);
  });
});

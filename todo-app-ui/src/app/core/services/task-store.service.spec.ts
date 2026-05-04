import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskStoreService } from './task-store.service';
import { TaskService } from './task.service';

const mockTasks = [
  { taskId: '1', description: 'Tarea 1', check: false },
  { taskId: '2', description: 'Tarea 2', check: true },
];

describe('TaskStoreService', () => {
  let store: TaskStoreService;
  let taskService: { getTasks: jest.Mock; updateTaskStatus: jest.Mock; createTask: jest.Mock; deleteTask: jest.Mock };

  beforeEach(() => {
    taskService = { getTasks: jest.fn(), updateTaskStatus: jest.fn(), createTask: jest.fn(), deleteTask: jest.fn() };

    TestBed.configureTestingModule({
      providers: [{ provide: TaskService, useValue: taskService }],
    });
    store = TestBed.inject(TaskStoreService);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should populate tasks signal after loadTasks', () => {
    taskService.getTasks.mockReturnValue(of(mockTasks));
    store.loadTasks();
    expect(store.tasks()).toEqual(mockTasks);
  });

  it('should set loading to false after loadTasks completes', () => {
    taskService.getTasks.mockReturnValue(of(mockTasks));
    store.loadTasks();
    expect(store.loading()).toBe(false);
  });

  it('should update task optimistically before backend responds', () => {
    taskService.getTasks.mockReturnValue(of(mockTasks));
    store.loadTasks();

    taskService.updateTaskStatus.mockReturnValue(of({ ...mockTasks[0], check: true }));
    store.toggleTask('1', true);

    expect(store.tasks()[0].check).toBe(true);
  });

  it('should sync task with backend response after toggle', () => {
    taskService.getTasks.mockReturnValue(of(mockTasks));
    store.loadTasks();

    const updated = { taskId: '1', description: 'Tarea 1 actualizada', check: true };
    taskService.updateTaskStatus.mockReturnValue(of(updated));
    store.toggleTask('1', true);

    expect(store.tasks()[0]).toEqual(updated);
  });

  it('should append new task after addTask succeeds', () => {
    taskService.getTasks.mockReturnValue(of(mockTasks));
    store.loadTasks();

    const newTask = { taskId: '3', description: 'Nueva tarea', check: false };
    taskService.createTask.mockReturnValue(of(newTask));
    store.addTask('Nueva tarea');

    expect(store.tasks().length).toBe(3);
    expect(store.tasks()[2]).toEqual(newTask);
  });

  it('should remove task from signal after removeTask succeeds', () => {
    taskService.getTasks.mockReturnValue(of(mockTasks));
    store.loadTasks();

    taskService.deleteTask.mockReturnValue(of(undefined));
    store.removeTask('1');

    expect(store.tasks().length).toBe(1);
    expect(store.tasks()[0].taskId).toBe('2');
  });

  it('should set creating to false after addTask completes', () => {
    taskService.createTask.mockReturnValue(of({ taskId: '3', description: 'x', check: false }));
    store.addTask('x');
    expect(store.creating()).toBe(false);
  });
});

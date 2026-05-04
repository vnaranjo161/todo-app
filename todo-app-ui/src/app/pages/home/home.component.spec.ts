import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TaskStoreService } from '../../core/services/task-store.service';

@Component({ selector: 'app-navbar', template: '', standalone: true })
class NavbarStub {}

@Component({ selector: 'app-task-list', template: '', standalone: true })
class TaskListStub {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: { tasks: ReturnType<typeof signal>; loading: ReturnType<typeof signal>; creating: ReturnType<typeof signal>; loadTasks: jest.Mock; toggleTask: jest.Mock; addTask: jest.Mock; removeTask: jest.Mock };

  beforeEach(async () => {
    store = {
      tasks: signal([]),
      loading: signal(false),
      creating: signal(false),
      loadTasks: jest.fn(),
      toggleTask: jest.fn(),
      addTask: jest.fn(),
      removeTask: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: TaskStoreService, useValue: store }],
    }).overrideComponent(HomeComponent, {
      set: { imports: [NavbarStub, TaskListStub] },
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTasks on init', () => {
    expect(store.loadTasks).toHaveBeenCalled();
  });

  it('should call toggleTask when onToggle is called', () => {
    component.onToggle({ taskId: '1', check: true });
    expect(store.toggleTask).toHaveBeenCalledWith('1', true);
  });

  it('should call addTask when onAdd is called', () => {
    component.onAdd('Nueva tarea');
    expect(store.addTask).toHaveBeenCalledWith('Nueva tarea');
  });

  it('should call removeTask when onDelete is called', () => {
    component.onDelete('1');
    expect(store.removeTask).toHaveBeenCalledWith('1');
  });
});

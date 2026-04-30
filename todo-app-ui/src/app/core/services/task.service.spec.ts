import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { environment } from '../../../environments/environment';

const BASE_URL = `${environment.apiUrl}`;

const mockTasks = [
  { taskId: '1', description: 'Tarea 1', check: false },
  { taskId: '2', description: 'Tarea 2', check: true },
];

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to /tasks', () => {
    service.getTasks().subscribe(result => {
      expect(result).toEqual(mockTasks);
    });
    const req = httpMock.expectOne(`${BASE_URL}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should make a PATCH request to /tasks/:id with the new check value', () => {
    const updated = { taskId: '1', description: 'Tarea 1', check: true };
    service.updateTaskStatus('1', true).subscribe(result => {
      expect(result).toEqual(updated);
    });
    const req = httpMock.expectOne(`${BASE_URL}/tasks/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ check: true });
    req.flush(updated);
  });

  it('should make a DELETE request to /tasks/:id', () => {
    service.deleteTask('1').subscribe();
    const req = httpMock.expectOne(`${BASE_URL}/tasks/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should make a POST request to /tasks with the description', () => {
    const created = { taskId: '3', description: 'Nueva tarea', check: false };
    service.createTask({ description: 'Nueva tarea' }).subscribe(result => {
      expect(result).toEqual(created);
    });
    const req = httpMock.expectOne(`${BASE_URL}/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ description: 'Nueva tarea' });
    req.flush(created);
  });
});

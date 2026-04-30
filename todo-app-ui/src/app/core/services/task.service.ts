import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateTaskRequest, Task } from '../shared/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}`;

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.BASE_URL}/tasks`);
  }

  updateTaskStatus(taskId: string, check: boolean): Observable<Task> {
    return this.http.patch<Task>(`${this.BASE_URL}/tasks/${taskId}`, { check });
  }

  createTask(body: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(`${this.BASE_URL}/tasks`, body);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/tasks/${taskId}`);
  }
}

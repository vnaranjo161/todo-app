import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskService } from './task.service';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  loading = signal<boolean>(false);
  creating = signal<boolean>(false);

  loadTasks(): void {
    this.loading.set(true);
    this.taskService.getTasks().subscribe({
      next: tasks => this.tasks.set(tasks),
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }

  addTask(description: string): void {
    if (this.creating()) return;
    this.creating.set(true);
    this.taskService.createTask({ description }).subscribe({
      next: task => {
        this.tasks.update(list => [...list, task]);
        this.creating.set(false);
      },
      error: () => this.creating.set(false),
    });
  }

  removeTask(taskId: string): void {
    const previous = this.tasks();
    this.tasks.update(list => list.filter(t => t.taskId !== taskId));
    this.taskService.deleteTask(taskId).subscribe({
      error: () => this.tasks.set(previous),
    });
  }

  toggleTask(taskId: string, check: boolean): void {
    this.tasks.update(list =>
      list.map(t => t.taskId === taskId ? { ...t, check } : t)
    );

    this.taskService.updateTaskStatus(taskId, check).subscribe({
      next: updated => {
        this.tasks.update(list =>
          list.map(t => t.taskId === updated.taskId ? updated : t)
        );
      },
      error: () => {
        this.tasks.update(list =>
          list.map(t => t.taskId === taskId ? { ...t, check: !check } : t)
        );
      },
    });
  }
}

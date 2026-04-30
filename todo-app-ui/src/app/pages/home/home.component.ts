import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { TaskListComponent } from '../../components/organisms/task-list/task-list.component';
import { TaskStoreService } from '../../core/services/task-store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, TaskListComponent],
  templateUrl: './home.component.html',
})
/**
 * @description Home page that displays the task list and handles task toggle interactions via the store
 * @export
 * @class HomeComponent
 */
export class HomeComponent implements OnInit {
  private store = inject(TaskStoreService);

  tasks = this.store.tasks;
  loading = this.store.loading;
  creating = this.store.creating;

  ngOnInit(): void {
    this.store.loadTasks();
  }

  onToggle(event: { taskId: string; check: boolean }): void {
    this.store.toggleTask(event.taskId, event.check);
  }

  onAdd(description: string): void {
    this.store.addTask(description);
  }
}

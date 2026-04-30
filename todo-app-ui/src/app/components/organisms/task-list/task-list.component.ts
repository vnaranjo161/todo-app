import { Component, input, output } from '@angular/core';
import { Task } from '../../../core/shared/models/task.model';
import { TaskItemComponent } from '../../molecules/task-item/task-item.component';
import { TaskInputComponent } from '../../molecules/task-input/task-input.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, TaskInputComponent],
  templateUrl: './task-list.component.html',
})
/**
 * @description Task list organism that renders the full list of tasks, a creation input, and handles loading and empty states
 * @export
 * @class TaskListComponent
 */
export class TaskListComponent {
  tasks = input.required<Task[]>();
  loading = input<boolean>(false);
  creating = input<boolean>(false);
  toggle = output<{ taskId: string; check: boolean }>();
  create = output<string>();
}

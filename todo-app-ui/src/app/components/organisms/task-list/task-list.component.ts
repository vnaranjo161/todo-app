import { Component, input, output } from '@angular/core';
import { Task } from '../../../core/shared/models/task.model';
import { TaskItemComponent } from '../../molecules/task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  tasks = input.required<Task[]>();
  loading = input<boolean>(false);
  toggle = output<{ taskId: string; check: boolean }>();
}

import { Component, input, output } from '@angular/core';
import { Task } from '../../../core/shared/models/task.model';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { IconButtonComponent } from '../../atoms/icon-button/icon-button.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CheckboxComponent, IconButtonComponent],
  templateUrl: './task-item.component.html',
})
/**
 * @description Task item molecule that displays a single task with its checkbox, description and delete icon
 * @export
 * @class TaskItemComponent
 */
export class TaskItemComponent {
  task = input.required<Task>();
  toggle = output<{ taskId: string; check: boolean }>();
}

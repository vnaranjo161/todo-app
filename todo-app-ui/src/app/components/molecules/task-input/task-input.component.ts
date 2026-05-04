import { Component, input, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './task-input.component.html',
})
/**
 * @description Molecule that combines a text input and a submit button to create a new task
 * @export
 * @class TaskInputComponent
 */
export class TaskInputComponent {
  creating = input<boolean>(false);
  create = output<string>();

  control = new FormControl('', Validators.required);

  submit(): void {
    const value = this.control.value?.trim();
    if (!value || this.creating()) return;
    this.create.emit(value);
    this.control.reset();
  }
}

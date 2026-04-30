import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
})
/**
 * @description Checkbox atom that emits the toggled boolean value on every change
 * @export
 * @class CheckboxComponent
 */
export class CheckboxComponent {
  id = input.required<string>();
  checked = input<boolean>(false);
  change = output<boolean>();
}

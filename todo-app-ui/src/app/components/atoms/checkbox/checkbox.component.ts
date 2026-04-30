import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  id = input.required<string>();
  checked = input<boolean>(false);
  change = output<boolean>();
}

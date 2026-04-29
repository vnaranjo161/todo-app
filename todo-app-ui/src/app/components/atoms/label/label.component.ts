import { Component, input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label.component.html',
})
export class LabelComponent {
  inputId = input.required<string>();
  label = input.required<string>();
}
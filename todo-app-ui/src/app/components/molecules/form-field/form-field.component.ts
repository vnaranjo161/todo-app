import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { LabelComponent } from "../../atoms/label/label.component";

@Component({
  selector: 'app-form-field',
  imports: [InputComponent, LabelComponent],
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent {
  label = input.required<string>();
  inputId = input.required<string>();
  inputType = input<string>('text');
  placeholder = input<string>('');
  control = input<FormControl>(new FormControl(''));
  patternError = input<string>('');
}

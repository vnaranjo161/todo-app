import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html'
})
export class InputComponent {
  id = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  control = input<FormControl>(new FormControl(''));
}

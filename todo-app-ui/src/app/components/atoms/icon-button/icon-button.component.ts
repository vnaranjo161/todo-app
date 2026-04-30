import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  disabled = input<boolean>(false);
}

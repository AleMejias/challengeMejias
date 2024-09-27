import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-errors-message',
  standalone: true,
  imports: [],
  template: `
    <span class="error">{{ message }}</span>
  `,
  styles: `
    .error {
      margin-top: 5px;
      color: #a11a1a;
      font-weight: 500;
      font-size: 14px;
    } 
  `
})
export class FormErrorsMessageComponent {

  @Input({required: true}) message!: string;
}

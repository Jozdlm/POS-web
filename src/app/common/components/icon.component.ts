import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<i [class]="iconCode"></i>`,
  styles: ``,
})
export class IconComponent {
  @Input({
    required: true,
  })
  public iconCode: string = '';
}

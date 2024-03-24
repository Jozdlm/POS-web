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
  public iconCode: string = '';

  @Input({
    required: true,
  })
  public set iconName(name: string) {
    this.iconCode = `bi bi-${name}`;
  }
}

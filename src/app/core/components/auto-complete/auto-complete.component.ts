import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class AutoCompleteComponent {
  public showOptions: boolean = false;

  @HostListener('window:click', ['$event'])
  public toggleOptions(event: MouseEvent): void {
    const element = event.target as HTMLElement;

    if (
      element.id == 'selectWrapper' ||
      element.parentElement?.id == 'selectWrapper'
    ) {
      this.showOptions = true;
    } else {
      this.showOptions = false;
    }
  }
}

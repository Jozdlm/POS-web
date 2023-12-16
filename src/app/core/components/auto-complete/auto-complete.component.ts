import { Component, HostListener, Input } from '@angular/core';
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

  @Input({ required: true }) public listId: string = '';

  @HostListener('window:click', ['$event'])
  public toggleOptions(event: MouseEvent): void {
    const element = event.target as HTMLElement;

    if (
      element.id == this.listId ||
      element.parentElement?.id == this.listId
    ) {
      this.showOptions = true;
    } else {
      this.showOptions = false;
    }
  }
}

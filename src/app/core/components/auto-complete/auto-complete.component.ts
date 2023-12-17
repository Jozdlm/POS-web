import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class AutoCompleteComponent {
  public showOptions: boolean = false;

  @Input({ required: true }) public listId: string = '';
  @Input({ required: true }) public placeholder: string = '';
  @Input({
    required: true,
    transform: (value: any[] | null) => {
      return value ?? [];
    },
  })
  public options: any[] = [];

  public searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe((value) => console.log(value));
  }

  @HostListener('window:click', ['$event'])
  public toggleOptions(event: MouseEvent): void {
    const element = event.target as HTMLElement;

    if (element.id == this.listId || element.parentElement?.id == this.listId) {
      this.showOptions = true;
    } else {
      this.showOptions = false;
    }
  }
}

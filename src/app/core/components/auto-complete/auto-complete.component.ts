import { Component, HostListener, Input, OnChanges } from '@angular/core';
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
export class AutoCompleteComponent implements OnChanges {
  public showOptions: boolean = false;
  public searchControl = new FormControl('');
  public listState: any[] = [];

  @Input({ required: true }) public listId: string = '';
  @Input({ required: true }) public placeholder: string = '';
  @Input({ required: true }) public label: string = '';
  @Input({
    required: true,
    transform: (value: any[] | null) => {
      return value ?? [];
    },
  })
  public options: any[] = [];

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe((value) => this.filterOptions(value ?? ''));
  }

  ngOnChanges(): void {
    this.listState = this.options;
    this.searchControl.setValue(this.placeholder);
  }

  public filterOptions(query: string): void {
    const querySanitazed = query.trim().toLowerCase();
    const filteredList = this.options.filter((item) =>
      (item.name as string).toLowerCase().includes(querySanitazed),
    );

    this.listState = filteredList;
  }

  public chooseOption(index: number) {
    const selectedOption = this.listState[index].name;
    this.searchControl.setValue(selectedOption);
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

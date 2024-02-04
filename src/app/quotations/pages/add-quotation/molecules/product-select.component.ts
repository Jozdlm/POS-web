import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        id="searchControl"
        placeholder="Buscar producto"
        [formControl]="searchControl"
      />
    </div>
  `,
  styles: `
    input::placeholder {
      font-size: 14px;
      display: grid;
    }
  `,
})
export class ProductSelectComponent {
  public searchControl = new FormControl<string>('');
}

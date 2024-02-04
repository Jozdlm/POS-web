import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { ProductService } from '@app/catalog/services/product.service';

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
export class ProductSelectComponent implements OnInit {
  private _productService = inject(ProductService);
  public searchControl = new FormControl<string>('');

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter((value) => typeof value === 'string'),
      map((value) => value as string),
      switchMap((value) => {
        return this._productService.getProductsBy({
          query: value,
          field: 'name',
          limit: 5,
        });
      }),
    );
  }
}

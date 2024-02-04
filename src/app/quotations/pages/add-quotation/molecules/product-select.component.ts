import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
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
import { Product } from '@app/catalog/models/product';

@Component({
  selector: 'app-product-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-3 select-wrapper">
      <input
        type="text"
        class="form-control select-field"
        id="searchControl"
        placeholder="Buscar producto"
        [formControl]="searchControl"
        autocomplete="off"
      />
      <div class="dropdown-wrapper">
        <div class="list-group dropdown">
          @for (item of results; track item.id) {
            <div
              class="list-group-item d-flex justify-content-between align-items-center result-item"
              (click)="selectItem(item)"
            >
              <div>
                <span class="badge bg-success rounded-pill">{{ ' ' }}</span>
              </div>
              <div class="ms-2 me-auto">
                {{ item.name }}
              </div>
              <div class="d-flex ms-3 column-gap-5 align-items-center">
                <p class="mb-0">{{ item.sellingPrice | currency: 'GTQ' }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    input::placeholder {
      font-size: 14px;
      display: grid;
    }

    .select-wrapper {
      width: 100%;
      min-width: 400px;
    }

    .select-field {
      width: 100%;
      max-width: 400px;
    }

    .dropdown-wrapper {
      position: relative;
      width: 100%
    }

    .dropdown {
      position: absolute;
      width: 100%;
      background-color: white;
      z-index: 99;
    }

    .result-item {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  `,
})
export class ProductSelectComponent implements OnInit {
  private _productService = inject(ProductService);
  public searchControl = new FormControl<string>('');
  public results: Product[] = [];
  public lastOptionSelected: string = '';

  @Output() onSelectItem = new EventEmitter<Product>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((value) => typeof value === 'string'),
        map((value) => value as string),
        filter((value) => value != this.lastOptionSelected),
        switchMap((value) => {
          return this._productService.getProductsBy({
            query: value,
            field: 'name',
            limit: 6,
          });
        }),
      )
      .subscribe((values) => {
        this.results = values;
      });
  }

  public selectItem(item: Product): void {
    this.onSelectItem.emit(item);
    this.searchControl.setValue(item.name);
    this.lastOptionSelected = item.name;
    this.results = [];
  }
}

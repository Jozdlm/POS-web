import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';
import { ProductService } from '@app/features/products/product.service';
import { Product } from '@app/features/products/product';
import { debounceSearch } from '@app/common';
import { InputFieldDirective } from '@app/ui/directives/input-field.directive';

@Component({
    selector: 'app-product-select',
    imports: [CommonModule, ReactiveFormsModule, InputFieldDirective],
    template: `
    <label for="searchControl" class="mb-1 block">Producto</label>
    <input
      type="search"
      id="searchControl"
      placeholder="Buscar producto"
      [formControl]="searchControl"
      autocomplete="off"
      uiInputField
    />
    <div class="relative w-full">
      <div class="absolute z-10 min-w-max rounded-md bg-white py-2 shadow">
        @for (item of results; track item.id) {
          <div
            class="flex cursor-pointer items-center justify-between gap-x-8 px-3 py-2 hover:bg-gray-100"
            (click)="selectItem(item)"
          >
            <div>
              {{ item.name }}
            </div>
            <div>
              {{ item.sellingPrice | currency: 'GTQ' }}
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ProductSelectComponent implements OnInit {
  private _productService = inject(ProductService);
  public searchControl = new FormControl<string>('');
  public results: Product[] = [];
  public lastOptionSelected: string = '';

  @Output() onSelectItem = new EventEmitter<Product>();
  @Output() onClearValue = new EventEmitter<any>();

  ngOnInit(): void {
    debounceSearch(this.searchControl, 300)
      .pipe(
        tap((value) => {
          if (value === '') {
            this.results = [];
            this.onClearValue.emit();
          }
        }),
        filter((value) => value != this.lastOptionSelected && value != ''),
        switchMap((value) => {
          return this._productService.getProducts({
            limit: 6,
            filterBy: {
              column: 'name',
              value,
            },
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

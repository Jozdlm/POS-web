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
import { Product } from '@app/catalog/models/product';

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
      <div>
        <div class="list-group">
          @for (item of results; track item.id) {
            <div
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div class="ms-2 me-auto">
                <div class="fw-medium">{{ item.name }}</div>
                <div class="small-text">{{ item.barcode }}</div>
              </div>
              <div class="d-flex ms-3 column-gap-5 align-items-center">
                <p class="mb-0">{{ item.sellingPrice | currency: 'GTQ' }}</p>
                <div>
                  <span class="badge bg-success rounded-pill">{{
                    item.inStock ? 'En Stock' : 'Sin Stock'
                  }}</span>
                </div>
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
  `,
})
export class ProductSelectComponent implements OnInit {
  private _productService = inject(ProductService);
  public searchControl = new FormControl<string>('');
  public results: Product[] = [];

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
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
      )
      .subscribe((values) => {
        this.results = values;
      });
  }
}

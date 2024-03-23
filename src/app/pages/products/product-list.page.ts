import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@app/features/products/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '@app/features/products/categories/category.service';
import { RouterModule } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { debounceSearch } from '@app/common/utils/debounce-search';
import { Product } from '@app/features/products/product';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <h1 class="fs-3 mb-3">Productos</h1>

    <div>
      <div class="d-flex justify-content-between">
        <div>
          <div class="d-flex mb-2 align-items-center">
            <input
              type="text"
              placeholder="Buscar producto"
              [formControl]="searchControl"
              class="form-control"
            />
            <button class="btn" (click)="clearSearchQuery()">Limpiar</button>
          </div>
          <p class="small-text">
            Mostrando {{ listState.length }} resultados de
            {{ productCount$ | async }}
          </p>
        </div>

        <div class="d-flex column-gap-2 align-items-start">
          <button
            class="btn btn-outline-secondary"
            (click)="toggleDisplayFilters()"
          >
            Filtrar
          </button>
          <button class="btn btn-primary" routerLink="add">
            Nuevo Producto
          </button>
        </div>
      </div>
      @if (diplayFilters) {
        <div class="mb-4">
          <div class="mb-3">
            <p class="fw-medium mb-1">Categorías</p>
            <form>
              @for (item of categories$ | async; track item.id) {
                <div class="form-check">
                  <input
                    type="checkbox"
                    [id]="item.name"
                    title="category checkbox"
                    class="form-check-input"
                  />
                  <label [for]="item.name" class="form-check-label">
                    {{ item.name }}
                  </label>
                </div>
              }
            </form>
          </div>
          <div class="mb-3">
            <label for="stockSelect" class="form-label fw-medium"
              >Existencias</label
            >
            <select
              class="form-select form-select-sm"
              aria-label="Stock select"
              id="stockSelect"
            >
              <option selected>Todos los registros</option>
              <option value="true">En existencia</option>
              <option value="false">Sin existencias</option>
            </select>
          </div>
          <div>
            <label for="stateSelect" class="form-label fw-medium">Estado</label>
            <select
              class="form-select form-select-sm"
              aria-label="State select"
              id="stateSelect"
            >
              <option selected>Todos los registros</option>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        </div>
      }
      <div class="list-group">
        @for (item of listState; track item.id) {
          <div
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="ms-2 me-auto">
              <div class="fw-medium">
                <a [routerLink]="['edit', item.id]" class="text-dark">{{
                  item.name
                }}</a>
              </div>
              <div class="small-text">{{ item.barcode }}</div>
            </div>
            <div class="d-flex ms-3 column-gap-5 align-items-center">
              <p class="mb-0">{{ item.sellingPrice | currency: 'GTQ' }}</p>
              <div>
                <span class="badge bg-success rounded-pill">{{
                  item.inStock ? 'En Stock' : 'Sin Stock'
                }}</span>
              </div>
              <div>
                <span class="badge bg-success rounded-pill">{{
                  item.isActive ? 'Activo' : 'Inactivo'
                }}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ProductListPage {
  private readonly _productService = inject(ProductService);
  private _subscriptions = new Subscription();
  public readonly categories$ = inject(CategoryService).getCategories();
  public readonly productCount$ = this._productService.getProductCount();
  public listState: Product[] = [];
  public diplayFilters: boolean = false;
  public searchControl = new FormControl('');

  public initialProducts$ = this._productService.getProducts({ limit: 50 });

  constructor() {
    this._subscriptions.add(this.getProductList());
    this._subscriptions.add(this.searchProduct());
    inject(DestroyRef).onDestroy(() => this._subscriptions.unsubscribe());
  }

  public getProductList(): Subscription {
    return this.initialProducts$.subscribe((values) => {
      this.listState = values;
    });
  }

  public searchProduct(): Subscription {
    return debounceSearch(this.searchControl, 300)
      .pipe(
        switchMap((query) => {
          if (query.trim() === '') {
            return this.initialProducts$;
          }

          return this._productService.getProducts({
            filterBy: {
              column: 'name',
              value: query,
            },
            limit: 50,
          });
        }),
      )
      .subscribe((products) => {
        this.listState = products;
      });
  }

  public clearSearchQuery(): void {
    this.searchControl.setValue('');
  }

  public toggleDisplayFilters(): void {
    this.diplayFilters = !this.diplayFilters;
  }
}

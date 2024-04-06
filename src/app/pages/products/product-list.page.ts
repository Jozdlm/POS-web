import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@app/features/products/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '@app/features/products/categories/category.service';
import { RouterModule } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { debounceSearch } from '@app/common/utils/debounce-search';
import { Product } from '@app/features/products/product';
import { InputFieldDirective } from '@app/ui';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { AddProductPage } from './add-product.page';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputFieldDirective,
    DialogModule,
  ],
  template: `
    <h1 class="text-xl mb-3">Productos</h1>

    <div>
      <div class="mb-6">
        <div>
          <div class="d-flex align-items-center relative mb-3">
            <input
              type="text"
              placeholder="Buscar producto"
              [formControl]="searchControl"
              uiInputField
              class="w-full"
            />
            <button
              [hidden]="searchControl.value?.length == 0"
              class="absolute right-3 top-1/4"
              (click)="clearSearchQuery()"
            >
              Limpiar
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="max-w-max rounded-md border border-slate-300 px-3 py-2 hover:bg-slate-50"
            (click)="toggleDisplayFilters()"
          >
            Filtrar
          </button>
          <button
            class="rounded-md bg-slate-700 px-3 py-2 text-white"
            (click)="openDialog()"
          >
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
      <div>
        <p class="small-text">
          Mostrando {{ listState.length }} resultados de
          {{ productCount$ | async }}
        </p>
        <table class="w-full">
          <thead>
            <tr>
              <th class="font-medium">Producto</th>
              <th class="font-medium">Código</th>
              <th class="font-medium">Precio Venta</th>
              <th class="font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            @for (item of listState; track item.id) {
              <tr>
                <td>
                  <a [routerLink]="['edit', item.id]" class="hover:underline">{{
                    item.name
                  }}</a>
                </td>
                <td>{{ item.barcode }}</td>
                <td>{{ item.sellingPrice | currency: 'GTQ' }}</td>
                <td>{{ item.isActive ? 'Activo' : 'Inactivo' }}</td>
              </tr>
            }
          </tbody>
        </table>
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

  public dialog = inject(Dialog);

  constructor() {
    this._subscriptions.add(this.getProductList());
    this._subscriptions.add(this.searchProduct());
    inject(DestroyRef).onDestroy(() => this._subscriptions.unsubscribe());
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddProductPage);
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

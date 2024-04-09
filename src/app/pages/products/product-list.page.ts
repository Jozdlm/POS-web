import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { debounceSearch } from '@app/common/utils/debounce-search';
import { InputFieldDirective } from '@app/ui';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { AddProductPage } from './add-product.page';
import {
  Product,
  ProductService,
  CategoryService,
} from '@app/features/products';
import { TableFiltersDialogComponent } from './_components/table-filters-dialog.component';

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
    <h1 class="mb-3 text-xl">Productos</h1>

    <div>
      <div class="mb-6">
        <div class="mb-3 flex gap-x-2">
          <div class="d-flex align-items-center relative flex-grow">
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
          <button
            class="max-w-max rounded-md border border-slate-300 px-3 py-2 hover:bg-slate-50"
            (click)="openFiltersDialog()"
          >
            Filtrar
          </button>
          <button
            class="rounded-md bg-slate-700 px-3 py-2 text-white"
            (click)="openProductDialog()"
          >
            Nuevo Producto
          </button>
        </div>
      </div>
      <div>
        <p class="mb-2">
          Mostrando {{ listState.length }} resultados de
          {{ productCount$ | async }}
        </p>
        <table class="w-full rounded outline outline-1 outline-slate-300">
          <thead class="border-b border-b-slate-300 text-gray-600">
            <tr>
              <th class="py-2 ps-4 text-start font-medium">Producto</th>
              <th class="py-2 text-start font-medium">SKU</th>
              <th class="py-2 text-start font-medium">Precio Venta</th>
              <th class="py-2 pe-4 text-start font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            @for (item of listState; track item.id) {
              <tr class="border-b border-b-slate-300 last:border-b-transparent">
                <td class="py-3 ps-4">
                  <a [routerLink]="['edit', item.id]" class="hover:underline">{{
                    item.name
                  }}</a>
                </td>
                <td class="py-3">{{ item.barcode }}</td>
                <td class="py-3">{{ item.sellingPrice | currency: 'GTQ' }}</td>
                <td class="py-3 pe-4">
                  {{ item.isActive ? 'Activo' : 'Inactivo' }}
                </td>
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

  public openProductDialog(): void {
    this.dialog.open(AddProductPage);
  }

  public openFiltersDialog(): void {
    this.dialog.open(TableFiltersDialogComponent, {
      data: this.categories$,
    });
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
}

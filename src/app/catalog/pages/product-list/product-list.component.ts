import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@app/catalog/services/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '@app/catalog/services/category.service';
import { RouterModule } from '@angular/router';
import { Product } from '@app/catalog/models/product';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private readonly _productService = inject(ProductService);
  private _subscriptions = new Subscription();
  public readonly categories$ = inject(CategoryService).getCategories();
  public readonly productCount$ = this._productService.getProductCount();
  public listState: Product[] = [];
  public diplayFilters: boolean = false;
  public searchControl = new FormControl('');

  constructor() {
    this._subscriptions.add(this.getProductList());
    this._subscriptions.add(this.searchProduct());
    inject(DestroyRef).onDestroy(() => this._subscriptions.unsubscribe());
  }

  public getProductList(): Subscription {
    return this._productService.getProducts().subscribe((values) => {
      this.listState = values;
    });
  }

  public searchProduct(): Subscription {
    return this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => typeof value === 'string'),
        map((query) => query as string),
        switchMap((query) => {
          if (query.trim() === '') {
            return this._productService.getProducts();
          }

          return this._productService.getProductsBy({
            query,
            field: 'name',
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

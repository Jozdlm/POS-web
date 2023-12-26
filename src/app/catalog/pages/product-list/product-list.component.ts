import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@app/catalog/services/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '@app/catalog/services/category.service';
import { RouterModule } from '@angular/router';
import { Product } from '@app/quotations/models/product';
import { Subscription } from 'rxjs';

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
  private products: Product[] = [];
  public readonly categories$ = inject(CategoryService).getCategories();
  public readonly productCount$ = this._productService.getProductCount();
  public listState: Product[] = [];
  public diplayFilters: boolean = false;
  public searchControl = new FormControl('');

  constructor() {
    this._subscriptions.add(this.getProductList());
    inject(DestroyRef).onDestroy(() => this._subscriptions.unsubscribe());
  }

  public getProductList(): Subscription {
    return this._productService.getProducts().subscribe((values) => {
      this.products = values;
      this.listState = values;
    });
  }

  public toggleDisplayFilters(): void {
    this.diplayFilters = !this.diplayFilters;
  }
}

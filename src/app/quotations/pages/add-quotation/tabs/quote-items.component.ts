import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '@app/common/components/icon.component';
import { Product } from '@app/catalog/models/product';
import { ProductService } from '@app/catalog/services/product.service';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';
import { RouterModule } from '@angular/router';
import { ProductSelectComponent } from '../molecules/product-select.component';

@Component({
  selector: 'app-quote-items',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconComponent,
    RouterModule,
    ProductSelectComponent,
  ],
  templateUrl: './quote-items.component.html',
  styles: `
    .price-control {
      max-width: 80px;
    }
  `,
})
export class QuoteItemsComponent {
  private readonly _productService = inject(ProductService);
  private readonly _quoteStateService = inject(QuotationStateService);
  private readonly _subscriptions = new Subscription();
  public quoteItems = this._quoteStateService.quoteItems;
  public subtotalQuote = this._quoteStateService.quoteSubtotal;
  public searchControl = new FormControl('');
  public filteredProducts: Product[] = [];

  constructor() {
    this.watchToQuerySearch();
    inject(DestroyRef).onDestroy(() => this._subscriptions.unsubscribe());
  }

  private watchToQuerySearch(): void {
    this._subscriptions.add(
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
        .subscribe((items) => {
          this.filteredProducts = items;
        }),
    );
  }

  public addItemToQuotation(item: Product): void {
    this._quoteStateService.addItem(item);
  }

  public increaseQuantity(itemId: number): void {
    this._quoteStateService.increaseQuantity(itemId);
  }

  public decreaseQuantity(itemId: number): void {
    this._quoteStateService.decreaseQuantity(itemId);
  }

  public removeItemOfQuotation(itemId: number): void {
    this._quoteStateService.removeItem(itemId);
  }

  public updateItemPrice(event: Event, itemId: number): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const sellinPrice = parseFloat(inputValue);

    this._quoteStateService.updateSellingPrice(itemId, sellinPrice);
  }

  public clearSearchControl(): void {
    this.searchControl.reset();
    this.filteredProducts = [];
  }
}

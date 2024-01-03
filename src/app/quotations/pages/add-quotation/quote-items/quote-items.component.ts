import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { QuoteState } from '@app/quotations/models/quote-state';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '@app/common/components/icon.component';
import { Product } from '@app/catalog/models/product';
import { ProductService } from '@app/catalog/services/product.service';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';
import { QuotationItem } from '@app/quotations/models/quotation-item';

@Component({
  selector: 'app-quote-items',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './quote-items.component.html',
  styleUrl: './quote-items.component.scss',
})
export class QuoteItemsComponent {
  private readonly _productService = inject(ProductService);
  private readonly _quoteStateService = inject(QuotationStateService);
  private readonly _subscriptions = new Subscription();
  public quoteState$ = this._quoteStateService.quoteState$;
  public searchControl = new FormControl('');
  public filteredProducts: Product[] = [];

  @Output() onClickToContinue = new EventEmitter<string>();

  constructor() {
    this.watchToQuerySearch();
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
    const quotationItem: QuotationItem = {
      productId: item.id,
      description: item.name,
      quantity: 1,
      price: item.sellingPrice,
      discount: 0,
      ammount: item.sellingPrice,
    };

    this._quoteStateService.addItem(quotationItem);
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

  public handleClickToContinue(): void {
    this.onClickToContinue.next('next');
  }
}

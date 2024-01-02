import { Component, Input, inject } from '@angular/core';
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

@Component({
  selector: 'app-quote-items',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './quote-items.component.html',
  styleUrl: './quote-items.component.scss',
})
export class QuoteItemsComponent {
addItemToQuotation(_t12: Product) {
throw new Error('Method not implemented.');
}
increaseQuantity(arg0: number) {
throw new Error('Method not implemented.');
}
removeItemOfQuotation(arg0: number) {
throw new Error('Method not implemented.');
}
updateItemPrice($event: Event,arg1: number) {
throw new Error('Method not implemented.');
}
  private readonly _productService = inject(ProductService);
  private readonly _subscriptions = new Subscription();
  public searchControl = new FormControl('');
  public filteredProducts: Product[] = [];

  @Input({ required: true }) quoteState$!: Observable<QuoteState>;

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

  public clearSearchControl(): void {
    this.searchControl.reset();
    this.filteredProducts = [];
  }
}

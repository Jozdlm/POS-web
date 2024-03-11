import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '@app/common/components/icon.component';
import { Product } from '@app/features/products/product';
import { QuotationStateService } from '@app/quotes/quotation-state.service';
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
  private readonly _quoteStateService = inject(QuotationStateService);
  public quoteItems = this._quoteStateService.quoteItems;
  public subtotalQuote = this._quoteStateService.quoteSubtotal;
  public newQuoteItem: Product | undefined;

  public itemQuantityControl = new FormControl<number>(0, {
    nonNullable: true,
  });
  public itemPriceControl = new FormControl<number>(0, {
    nonNullable: true,
  });

  public setInitialValues(item: Product): void {
    this.newQuoteItem = item;
    this.itemQuantityControl.setValue(1);
    this.itemPriceControl.setValue(item.sellingPrice);
  }

  public clearInitialValues(): void {
    this.newQuoteItem = undefined;
    this.itemQuantityControl.reset();
    this.itemPriceControl.reset();
  }

  public addItemToQuotation(): void {
    if (this.newQuoteItem) {
      this._quoteStateService.addItem(
        this.newQuoteItem,
        this.itemQuantityControl.getRawValue(),
        this.itemPriceControl.getRawValue(),
      );
      this.clearInitialValues();
    }
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
}

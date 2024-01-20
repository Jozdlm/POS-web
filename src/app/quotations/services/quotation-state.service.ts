import { Injectable, computed, inject, signal } from '@angular/core';
import { QuotationItem } from '../models/quotation-item';
import { QuoteFormStateService } from './quote-form-state.service';

@Injectable({
  providedIn: 'root',
})
export class QuotationStateService {
  private _quoteItems = signal<QuotationItem[]>([]);
  public quoteItems = this._quoteItems.asReadonly();
  public quoteWithDiscount = signal<boolean>(false);
  public quoteHeaderForm = inject(QuoteFormStateService).quoteForm;

  public quoteSubtotal = computed<number>(() => {
    return this.quoteItems().reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0,
    );
  });

  public quoteDiscount = computed<number>(() => {
    return this.quoteItems().reduce((prev, curr) => prev + curr.discount, 0);
  });

  public quoteAmmount = computed<number>(() => {
    return this.quoteItems().reduce((prev, curr) => prev * 1 + curr.ammount, 0);
  });

  public quoteState = computed(() => {
    return {
      items: this.quoteItems(),
      subtotal: this.quoteSubtotal(),
      discount: this.quoteDiscount(),
      total: this.quoteAmmount(),
      ...this.quoteHeaderForm.getRawValue(),
    };
  });

  constructor() {
    this.quoteHeaderForm.controls.promotionType.valueChanges.subscribe(
      (value) => {
        if (value * 1 === 1) {
          this.addDiscount();
        } else {
          this.removeDiscount();
        }
      },
    );
  }

  private isInQuoteItems(itemId: number): boolean {
    const itemIndex = this.quoteItems().findIndex(
      (item) => item.productId === itemId,
    );

    return itemIndex >= 0 ? true : false;
  }

  public addDiscount(): void {
    this._quoteItems.update((value) => {
      return value.map((item) => {
        const discount = item.ammount * 0.1;
        const ammount = item.ammount - discount;

        return {
          ...item,
          discount,
          ammount,
        };
      });
    });
    this.quoteWithDiscount.set(true);
  }

  public removeDiscount(): void {
    this._quoteItems.update((value) => {
      return value.map((item) => {
        const discount = 0;
        const ammount = item.quantity * item.price;

        return {
          ...item,
          discount,
          ammount,
        };
      });
    });
    this.quoteWithDiscount.set(false);
  }

  private mutateItem(
    type: '+Qty' | '-Qty' | 'updPrice',
    itemId: number,
    newPrice?: number,
  ): void {
    const itemIndex = this.quoteItems().findIndex(
      (item) => item.productId == itemId,
    );

    if (itemIndex === -1) return;

    const item = this._quoteItems()[itemIndex];
    let updatedQty: number = item.quantity;
    let updatedPrice: number = item.price;

    if (type === '-Qty') {
      updatedQty = item.quantity > 1 ? item.quantity - 1 : updatedQty;
    } else if (type === '+Qty') {
      updatedQty = item.quantity + 1;
    } else if (type === 'updPrice' && newPrice) {
      updatedPrice = newPrice > 0.01 ? newPrice : updatedPrice;
    }

    this._quoteItems.update((value) => {
      item.price = updatedPrice;
      item.quantity = updatedQty;
      item.ammount = updatedQty * (updatedPrice - item.discount);

      const newArr = [...value];
      newArr[itemIndex] = item;

      return newArr;
    });
  }

  public addItem(newItem: QuotationItem): void {
    if (this.quoteWithDiscount()) {
      newItem.discount = newItem.price * 0.1;
      newItem.ammount = newItem.price - newItem.discount;
    }

    if (this.isInQuoteItems(newItem.productId)) {
      this.increaseQuantity(newItem.productId);
    } else {
      this._quoteItems.update((value) => {
        return [...value, newItem];
      });
    }
  }

  public removeItem(itemId: number): void {
    this._quoteItems.update((value) => {
      return [...value.filter((item) => item.productId != itemId)];
    });
  }

  public increaseQuantity(itemId: number): void {
    if (!this.isInQuoteItems(itemId)) return;
    this.mutateItem('+Qty', itemId);
  }

  public decreaseQuantity(itemId: number): void {
    if (!this.isInQuoteItems(itemId)) return;
    this.mutateItem('-Qty', itemId);
  }

  public updateSellingPrice(itemId: number, newPrice: number): void {
    if (!this.isInQuoteItems(itemId)) return;
    this.mutateItem('updPrice', itemId, newPrice);
  }

  public clearQuotationState(): void {
    this._quoteItems.set([]);
  }
}

import { Injectable, computed, inject, signal } from '@angular/core';
import { QuotationItem } from '../models/quotation-item';
import { QuoteFormStateService } from './quote-form-state.service';
import { Product } from '@app/catalog/models/product';
import { decreaseItemQty, increaseItemQty } from '../item-mutator.helper';

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

    const item = this.quoteItems()[itemIndex];
    const { quantity, price } = item;

    if (type === '-Qty') {
      item.quantity = quantity > 1 ? item.quantity - 1 : quantity;
    } else if (type === '+Qty') {
      item.quantity = quantity + 1;
    } else if (type === 'updPrice' && newPrice) {
      item.price = newPrice > 0.01 ? newPrice : price;
    }

    this._quoteItems.update((value) => {
      item.ammount = item.quantity * (item.price - item.discount);

      const newArr = [...value];
      newArr[itemIndex] = item;

      return newArr;
    });
  }

  public addItem(newItem: Product): void {
    const quoteItem: QuotationItem = {
      productId: newItem.id,
      description: newItem.name,
      quantity: 1,
      price: newItem.sellingPrice,
      discount: 0,
      ammount: newItem.sellingPrice,
    };

    if (this.quoteWithDiscount()) {
      quoteItem.discount = quoteItem.price * 0.1;
      quoteItem.ammount = quoteItem.price - quoteItem.discount;
    }

    if (this.isInQuoteItems(quoteItem.productId)) {
      this.increaseQuantity(quoteItem.productId);
    } else {
      this._quoteItems.update((value) => {
        return [...value, quoteItem];
      });
    }
  }

  public removeItem(itemId: number): void {
    this._quoteItems.update((value) => {
      return [...value.filter((item) => item.productId != itemId)];
    });
  }

  public increaseQuantity(producId: number): void {
    if (!this.isInQuoteItems(producId)) return;

    this._quoteItems.update((currValue) => {
      return increaseItemQty(currValue, producId);
    });
  }

  public decreaseQuantity(productId: number): void {
    if (!this.isInQuoteItems(productId)) return;

    this._quoteItems.update((currValue) => {
      return decreaseItemQty(currValue, productId);
    });
  }

  public updateSellingPrice(itemId: number, newPrice: number): void {
    if (!this.isInQuoteItems(itemId)) return;
    this.mutateItem('updPrice', itemId, newPrice);
  }

  public clearQuotationState(): void {
    this._quoteItems.set([]);
    this.quoteHeaderForm.reset();
  }
}

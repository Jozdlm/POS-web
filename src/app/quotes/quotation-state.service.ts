import { Injectable, computed, inject, signal } from '@angular/core';
import { QuotationItem } from './quotation-item';
import { Product } from '@app/products/product';
import {
  addItemDiscount,
  decreaseItemQty,
  increaseItemQty,
  removeItemDiscount,
  updateItemPrice,
} from './item-mutator.helper';
import { FormBuilder, Validators } from '@angular/forms';
import { getCurrentDate } from '@app/common';

@Injectable({
  providedIn: 'root',
})
export class QuotationStateService {
  private _quoteItems = signal<QuotationItem[]>([]);
  public quoteItems = this._quoteItems.asReadonly();
  public quoteWithDiscount = signal<boolean>(false);

  public quoteHeaderForm = inject(FormBuilder).nonNullable.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    studentName: ['N/A', [Validators.required, Validators.minLength(3)]],
    date: [getCurrentDate(), Validators.required],
    schoolGrade: [0, [Validators.required, Validators.min(1)]],
    school: [0, [Validators.required, Validators.min(1)]],
    promotionType: [0, [Validators.required, Validators.min(1)]],
  });

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
      return value.map((item) => addItemDiscount(item));
    });

    this.quoteWithDiscount.set(true);
  }

  public removeDiscount(): void {
    this._quoteItems.update((value) => {
      return value.map((item) => removeItemDiscount(item));
    });

    this.quoteWithDiscount.set(false);
  }

  public addItem(newItem: Product, quantity: number = 1, price?: number): void {
    const sellingPrice = price ?? newItem.sellingPrice;
    const quoteItem: QuotationItem = {
      productId: newItem.id,
      description: newItem.name,
      quantity,
      price: sellingPrice,
      discount: 0,
      ammount: quantity * sellingPrice,
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

  public updateSellingPrice(productId: number, newPrice: number): void {
    if (!this.isInQuoteItems(productId)) return;

    this._quoteItems.update((curr) => {
      return updateItemPrice(curr, productId, newPrice);
    });
  }

  public clearQuotationState(): void {
    this._quoteItems.set([]);
    this.quoteHeaderForm.reset();
  }
}

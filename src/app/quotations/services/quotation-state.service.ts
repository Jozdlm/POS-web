import { Injectable, inject } from '@angular/core';
import { QuotationItem } from '../models/quotation-item';
import { BehaviorSubject } from 'rxjs';
import { QuoteState } from '../models/quote-state';
import { FormBuilder, Validators } from '@angular/forms';
import { getCurrentDate } from '@app/common';

@Injectable({
  providedIn: 'root',
})
export class QuotationStateService {
  private _items: QuotationItem[] = [];
  private _subtotal: number = 0;
  private _discount: number = 0;
  private _total: number = 0;
  private _quoteWithDiscount: boolean = false;

  private _quoteState$ = new BehaviorSubject<QuoteState>({
    items: this._items,
    subtotal: this._subtotal,
    discount: this._discount,
    total: this._total,
  });

  public quoteHeaderForm = inject(FormBuilder).nonNullable.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    studentName: ['N/A', [Validators.required, Validators.minLength(3)]],
    date: [getCurrentDate(), Validators.required],
    schoolGrade: [0, [Validators.required, Validators.min(1)]],
    school: [0, [Validators.required, Validators.min(1)]],
    promotionType: [0, [Validators.required, Validators.min(1)]],
  });

  public readonly quoteState$ = this._quoteState$.asObservable();

  constructor() {}

  private getSubtotal(): number {
    return this._items.reduce(
      (prev, curr) => +prev + curr.price * curr.quantity,
      0,
    );
  }

  private getTotalDiscount(): number {
    return this._items.reduce((prev, curr) => +prev + curr.discount, 0);
  }

  private getTotalAmmount(): number {
    const ammount: number = this._items.reduce(
      (prev, curr) => prev * 1 + curr.ammount,
      0.0,
    );

    return ammount;
  }

  private emmitStateChanges(): void {
    this._quoteState$.next({
      items: this._items,
      subtotal: this.getSubtotal(),
      discount: this.getTotalDiscount(),
      total: this.getTotalAmmount(),
    });
  }

  private calculateInitialValues(item: QuotationItem): QuotationItem {
    if (this._quoteWithDiscount) {
      item.discount = item.price * 0.1;
      item.ammount = item.price - item.discount;
    }

    return { ...item };
  }

  public addDiscount(): void {
    this._items = this._items.map((item) => {
      const discount = item.ammount * 0.1;
      const ammount = item.ammount - discount;

      return {
        ...item,
        discount,
        ammount,
      };
    });

    this._quoteWithDiscount = true;
    this.emmitStateChanges();
  }

  public removeDiscount(): void {
    this._items = this._items.map((item) => {
      const discount = 0;
      const ammount = item.quantity * item.price;

      return {
        ...item,
        discount,
        ammount,
      };
    });

    this._quoteWithDiscount = false;
    this.emmitStateChanges();
  }

  public getStateSnapshot() {
    return {
      items: this._items,
      subtotal: this.getSubtotal(),
      discount: this.getTotalDiscount(),
      total: this.getTotalAmmount(),
      ...this.quoteHeaderForm.getRawValue(),
    };
  }

  private mutateItem(
    type: '+Qty' | '-Qty' | 'updPrice',
    itemIndex: number,
    newPrice?: number,
  ): void {
    const item = this._items[itemIndex];
    let updatedQty: number = item.quantity;
    let updatedPrice: number = item.price;

    if (type === '-Qty') {
      updatedQty = item.quantity > 1 ? item.quantity - 1 : updatedQty;
    } else if (type === '+Qty') {
      updatedQty = item.quantity + 1;
    } else if (type === 'updPrice' && newPrice) {
      updatedPrice = newPrice > 0.01 ? newPrice : updatedPrice;
    }

    this._items[itemIndex] = {
      ...item,
      price: updatedPrice,
      quantity: updatedQty,
      ammount: updatedQty * updatedPrice,
    };

    this.emmitStateChanges();
  }

  public addItem(newItem: QuotationItem): void {
    const inArray = this._items.find(
      (item) => item.productId == newItem.productId,
    );

    newItem = this.calculateInitialValues(newItem);

    if (inArray) {
      this.increaseQuantity(newItem.productId);
    } else {
      this._items = [...this._items, newItem];
      this.emmitStateChanges();
    }
  }

  public removeItem(itemId: number): void {
    this._items = [...this._items.filter((item) => item.productId != itemId)];
    this.emmitStateChanges();
  }

  public increaseQuantity(itemId: number): void {
    const itemIndex = this._items.findIndex(
      (item) => item.productId === itemId,
    );

    if (itemIndex !== -1) {
      this.mutateItem('+Qty', itemIndex);
    }
  }

  public decreaseQuantity(itemId: number): void {
    const itemIndex = this._items.findIndex(
      (item) => item.productId === itemId,
    );

    if (itemIndex !== -1) {
      this.mutateItem('-Qty', itemIndex);
    }
  }

  public updateSellingPrice(itemId: number, newPrice: number): void {
    const itemIndex = this._items.findIndex(
      (item) => item.productId === itemId,
    );

    if (itemIndex !== -1) {
      this.mutateItem('updPrice', itemIndex, newPrice);
    }
  }

  public clearQuotationState(): void {
    this._items = [];
    this.emmitStateChanges();
  }
}

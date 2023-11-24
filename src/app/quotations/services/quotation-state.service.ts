import { Injectable } from '@angular/core';
import { QuotationItem } from '../models/quotation-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotationStateService {
  private _items: QuotationItem[] = [];
  private _ammountEmitter = new BehaviorSubject<number>(0);
  private _stateEmitter = new BehaviorSubject<QuotationItem[]>([]);
  public readonly items$ = this._stateEmitter.asObservable();
  public readonly ammount$ = this._ammountEmitter.asObservable();

  constructor() {}

  private getTotalAmmount(): number {
    return this._items.reduce((prev, curr) => prev * 1 + curr.ammount, 0.0);
  }

  private emmitStateChanges(): void {
    this._stateEmitter.next(this._items);
    this._ammountEmitter.next(this.getTotalAmmount());
  }

  public addItem(newItem: QuotationItem): void {
    const inArray = this._items.find(
      (item) => item.productId == newItem.productId,
    );

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

  // TODO: Improve the code readability

  public increaseQuantity(itemId: number): void {
    const itemIndex = this._items.findIndex(
      (item) => item.productId === itemId,
    );

    if (itemIndex !== -1) {
      const item = this._items[itemIndex];
      const newQuantity = item.quantity + 1;

      this._items[itemIndex] = {
        ...item,
        quantity: newQuantity,
        ammount: newQuantity * item.price,
      };

      this.emmitStateChanges();
    }
  }

  public decreaseQuantity(itemId: number): void {
    const itemIndex = this._items.findIndex(
      (item) => item.productId === itemId,
      );

    if (itemIndex !== -1) {
      const item = this._items[itemIndex];
      const newQuantity = item.quantity - 1;

      if (item.quantity > 1) {
        this._items[itemIndex] = {
          ...item,
          quantity: newQuantity,
          ammount: newQuantity * item.price,
        };

        this.emmitStateChanges();
      }
      // TODO: Otherwise ask to the user if their wants to delete an item
    }
  }
}

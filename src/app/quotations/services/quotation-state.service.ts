import { Injectable } from '@angular/core';
import { QuotationItem } from '../models/quotation-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotationStateService {
  private _items: QuotationItem[] = [];
  private _stateEmitter = new BehaviorSubject<QuotationItem[]>([]);
  public readonly items$ = this._stateEmitter.asObservable();

  constructor() {}

  public addItem(item: QuotationItem): void {
    // TODO: Validates if the item is already exist at items array
    this._items = [...this._items, item];
    this._stateEmitter.next(this._items);
  }

  public removeItem(itemId: number): void {
    this._items = [...this._items.filter((item) => item.productId != itemId)];
    this._stateEmitter.next(this._items);
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

      this._stateEmitter.next(this._items);
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
          quantity: newQuantity - 1,
          ammount: newQuantity - 1 * item.price,
        };

        this._stateEmitter.next(this._items);
      }
      // TODO: Otherwise ask to the user if their wants to delete an item
    }
  }
}

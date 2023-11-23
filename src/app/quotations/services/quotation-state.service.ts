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
}

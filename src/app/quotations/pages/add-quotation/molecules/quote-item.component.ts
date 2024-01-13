import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationItem } from '@app/quotations/models/quotation-item';
import { IconComponent } from '@app/common';

interface MutationEvent {
  productId: number;
  value: number;
}

@Component({
  selector: 'app-quote-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './quote-item.component.html',
  styles: ``,
})
export class QuoteItemComponent {
  @Input({ required: true }) quoteItem!: QuotationItem;

  @Output() onIncreaseQty = new EventEmitter<number>();
  @Output() onDecreaseQty = new EventEmitter<number>();
  @Output() onUpdatePrice = new EventEmitter<MutationEvent>();
  @Output() onRemoveItem = new EventEmitter<number>();

  public updateItemPrice(event: Event, productId: number) {
    const inputValue = (event.target as HTMLInputElement).value;
    const value = parseFloat(inputValue);

    this.onUpdatePrice.emit({ productId, value });
  }

  public increaseQuantity(productId: number) {
    this.onIncreaseQty.emit(productId);
  }

  public decreaseQuantity(productId: number) {
    this.onDecreaseQty.emit(productId);
  }

  public removeItemOfQuotation(productId: number) {
    this.onRemoveItem.emit(productId);
  }
}

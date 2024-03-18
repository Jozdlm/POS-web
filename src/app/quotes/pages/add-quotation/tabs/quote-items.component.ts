import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '@app/common/components/icon.component';
import { Product } from '@app/features/products/product';
import { QuotationStateService } from '@app/quotes/quotation-state.service';
import { RouterModule } from '@angular/router';
import { ProductSelectComponent } from '@app/ui/components/product-select/product-select.component';

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
  template: `
    <div>
      <div class="d-flex align-items-end mb-4 column-gap-4">
        <app-product-select
          class="flex-grow-1"
          (onSelectItem)="setInitialValues($event)"
          (onClearValue)="clearInitialValues()"
        ></app-product-select>
        <div>
          <label for="itemQuantity" class="form-label">Cantidad</label>
          <input
            class="form-control price-control"
            type="number"
            min="0"
            step="1"
            id="itemQuantity"
            [formControl]="itemQuantityControl"
          />
        </div>
        <div>
          <label for="itemPrice" class="form-label">Precio</label>
          <input
            class="form-control price-control"
            type="number"
            min="0.00"
            step="0.01"
            id="itemPrice"
            [formControl]="itemPriceControl"
          />
        </div>
        <div>
          <button
            class="btn btn-light"
            aria-label="add item button"
            (click)="addItemToQuotation()"
          >
            <ui-icon iconName="plus" />
          </button>
        </div>
      </div>

      <hr />

      <table class="table align-middle">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Valor Unitario</th>
            <th>Importe</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          @for (item of quoteItems(); track item.productId) {
            <tr>
              <td>{{ item.description }}</td>
              <td>
                <div class="d-flex justify-content-between align-items-center">
                  <button
                    class="btn btn-light me-1 btn-sm"
                    (click)="decreaseQuantity(item.productId)"
                  >
                    -
                  </button>
                  {{ item.quantity }}
                  <button
                    class="btn btn-light ms-1 btn-sm"
                    (click)="increaseQuantity(item.productId)"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                <input
                  class="form-control form-control-sm price-control"
                  type="number"
                  placeholder=".form-control-sm"
                  [value]="item.price"
                  min="0.00"
                  step="0.01"
                  (input)="updateItemPrice($event, item.productId)"
                />
              </td>
              <td>
                <span class="d-block">{{
                  item.ammount | currency: 'GTQ'
                }}</span>

                @if (item.discount > 0) {
                  <span
                    class="small-text text-dark-emphasis text-decoration-line-through"
                    >{{ item.price * item.quantity | currency: 'GTQ' }}</span
                  >
                }
              </td>
              <td>
                <button
                  class="btn btn-outline-danger btn-sm"
                  (click)="removeItemOfQuotation(item.productId)"
                  aria-label="remove item button"
                >
                  <ui-icon iconName="x" />
                </button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5" class="text-center">
                No se han añadido productos
              </td>
            </tr>
          }
        </tbody>
      </table>

      <div class="d-flex flex-column align-items-end">
        <p class="text-end">
          <span class="d-block fs-5"
            >Subtotal: {{ subtotalQuote() | currency: 'GTQ' }}</span
          >
        </p>

        <button
          type="button"
          class="btn btn-primary"
          routerLink="../quote-info"
          [disabled]="quoteItems().length === 0"
        >
          Continuar
        </button>
      </div>
    </div>
  `,
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

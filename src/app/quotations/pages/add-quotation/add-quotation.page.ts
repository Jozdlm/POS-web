import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';
import { IconComponent } from '@app/common/components/icon.component';

@Component({
  standalone: true,
  templateUrl: './add-quotation.page.html',
  styleUrl: './add-quotation.page.scss',
  imports: [CommonModule, RouterModule, IconComponent],
})
export class AddQuotationPage {
  private readonly _quotationState = inject(QuotationStateService);
  public tabItems = [
    { path: '/cart', label: '1. Carrito' },
    { path: '/quote-info', label: '2. Datos adicionales' },
    { path: '/confirmation', label: '3. Confirmación' },
  ];

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this._quotationState.clearQuotationState();
    });
  }

  public disableTab(tabName: string): boolean {
    const items = this._quotationState.quoteItems();
    const isFormInvalid = this._quotationState.quoteHeaderForm.invalid;

    if (tabName === this.tabItems[2].path) {
      if (items.length === 0 || isFormInvalid) {
        return true;
      }
    }

    return false;
  }
}

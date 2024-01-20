import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';
import { IconComponent } from '@app/common/components/icon.component';
import { QuoteHeaderComponent } from './molecules/quote-header.component';
import { QuoteItemsComponent } from './molecules/quote-items.component';
import { QuoteConfirmationComponent } from './molecules/quote-confirmation.component';

@Component({
  standalone: true,
  templateUrl: './add-quotation.component.html',
  styleUrl: './add-quotation.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    IconComponent,
    QuoteHeaderComponent,
    QuoteItemsComponent,
    QuoteConfirmationComponent,
  ],
})
export class AddQuotationComponent {
  private readonly _quotationState = inject(QuotationStateService);
  public tabItems: string[] = [
    '1. Carrito',
    '2. Datos del cliente',
    '3. Confirmación',
  ];
  public currentTab: string = this.tabItems[0];

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this._quotationState.clearQuotationState();
    });
  }

  public setCurrentTab(tab: string): void {
    this.currentTab = tab;
  }

  public getActiveTabClassName(tabName: string): string {
    return this.currentTab == tabName ? 'btn-primary' : '';
  }

  public disableTab(tabName: string): boolean {
    const items = this._quotationState.quoteItems();
    const isFormInvalid = this._quotationState.quoteHeaderForm.invalid;

    if (tabName === this.tabItems[2]) {
      if (items.length === 0 || isFormInvalid) {
        return true;
      }
    }

    return false;
  }
}

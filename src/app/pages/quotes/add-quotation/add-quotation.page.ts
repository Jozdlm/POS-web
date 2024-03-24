import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuotationStateService } from '@app/features/quotes/quotation-state.service';
import { IconComponent } from '@app/ui/components/icon.component';

@Component({
  standalone: true,
  template: `
    <div class="view-wrapper">
      <div class="mb-5">
        <h1 class="fs-3 mb-lg-3">Nueva Cotización</h1>

        <div class="d-flex column-gap-3">
          @for (item of tabItems; track $index) {
            <button
              type="button"
              class="btn btn-sm"
              [routerLink]="['./' + item.path]"
              routerLinkActive="btn-primary"
              [disabled]="disableTab(item.path)"
            >
              {{ item.label }}
            </button>
          }
        </div>
      </div>
      <div class="row w-100">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
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

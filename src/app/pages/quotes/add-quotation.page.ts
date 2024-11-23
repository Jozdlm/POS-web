import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuotationStateService } from '@app/features/quotes/quotation-state.service';
import { IconComponent } from '@app/ui/components/icon.component';

@Component({
    imports: [CommonModule, RouterModule, IconComponent],
    template: `
    <div class="mx-auto w-full max-w-screen-md">
      <div class="mb-5">
        <h1 class="mb-4 text-lg font-medium">Nueva Cotización</h1>

        <div class="flex max-w-max rounded-md bg-slate-200 p-1">
          @for (item of tabItems; track $index) {
            <button
              type="button"
              class="rounded-lg px-3 py-2 text-sm"
              [routerLink]="['./' + item.path]"
              routerLinkActive="bg-slate-600 text-white"
              [disabled]="disableTab(item.path)"
            >
              {{ item.label }}
            </button>
          }
        </div>
      </div>
      <div class="mx-auto w-full">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
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

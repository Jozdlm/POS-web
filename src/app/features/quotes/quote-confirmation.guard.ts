import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuotationStateService } from '@app/features/quotes/quotation-state.service';

export const quoteConfirmationGuard: CanActivateFn = (_, __) => {
  const { quoteItems, quoteHeaderForm } = inject(QuotationStateService);

  if (quoteItems().length === 0 || quoteHeaderForm.invalid) {
    return inject(Router).createUrlTree(['/', 'quotations', 'add']);
  }

  return true;
};

import { CanActivateFn } from '@angular/router';

export const quoteConfirmationGuard: CanActivateFn = (route, state) => {
  return true;
};

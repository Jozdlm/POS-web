import { CanActivateFn } from '@angular/router';

export const anonClientGuard: CanActivateFn = (route, state) => {
  return true;
};

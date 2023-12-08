import { CanActivateFn } from '@angular/router';

export const loggedClientGuard: CanActivateFn = (route, state) => {
  return true;
};

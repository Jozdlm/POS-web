import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const anonClientGuard: CanActivateFn = (_, __) => {
  const isLogged = inject(SessionService).isClientLogged;

  if (isLogged) {
    return inject(Router).createUrlTree(['/']);
  }

  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { map } from 'rxjs';

export const anonClientGuard: CanActivateFn = (_, __) => {
  const router: Router = inject(Router);
  const sessionToken$ = inject(SessionService).getSessionToken();

  return sessionToken$.pipe(
    map((sessionToken) => {
      if (sessionToken) {
        return router.createUrlTree(['/']);
      }

      return true;
    }),
  );
};

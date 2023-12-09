import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { map } from 'rxjs';

export const loggedClientGuard: CanActivateFn = (_, __) => {
  const router: Router = inject(Router);

  return inject(SessionService).isClientLogged$.pipe(
    map((isLogged) => {
      if (!isLogged) {
        return router.createUrlTree(['/', 'auth']);
      }

      return true;
    }),
  );
};

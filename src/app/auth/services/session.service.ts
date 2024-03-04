import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from '../models/login-credentials';
import { Observable, map } from 'rxjs';
import { AUTH } from '@api/index';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly _router = inject(Router);

  public getSessionToken(): Observable<string | null> {
    return AUTH.getSessionToken();
  }

  public logInUser(credentials: LoginCredentials): Observable<void> {
    return AUTH.logInWithEmail(credentials).pipe(
      map((response) => {
        if (response.error) throw new Error(response.error.message);

        this._router.navigateByUrl('/');
      }),
    );
  }

  public logOutUser(): Observable<void> {
    return AUTH.logOut().pipe(
      map((response) => {
        if (response.error) throw new Error(response.error.message);

        this._router.navigateByUrl('/auth');
      }),
    );
  }
}

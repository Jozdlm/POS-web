import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from './login-credentials';
import { Observable, map } from 'rxjs';
import { API } from '@api/index';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly _router = inject(Router);

  public getSessionToken(): Observable<string | null> {
    return API.getSessionToken();
  }

  public logInUser(credentials: LoginCredentials): Observable<void> {
    return API.logInWithEmail(credentials).pipe(
      map((response) => {
        if (response.error) throw new Error(response.error.message);

        this._router.navigateByUrl('/');
      }),
    );
  }

  public logOutUser(): Observable<void> {
    return API.logOut().pipe(
      map((response) => {
        if (response.error) throw new Error(response.error.message);

        this._router.navigateByUrl('/auth');
      }),
    );
  }
}

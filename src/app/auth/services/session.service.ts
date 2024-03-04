import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '@app/common/services/supabase.service';
import { LoginCredentials } from '../models/login-credentials';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { AUTH } from '@api/index';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly _supaService = inject(SupabaseService);
  private readonly _router = inject(Router);
  private readonly _db = this._supaService.supabase;
  private readonly _stateEmmitter = new BehaviorSubject<boolean | null>(null);

  public isClientLogged$: Observable<boolean> = this._stateEmmitter
    .asObservable()
    .pipe(
      filter((value) => typeof value === 'boolean'),
      map((value) => value as boolean),
    );

  constructor() {
    this._db.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_OUT') {
        this._stateEmmitter.next(false);
      } else if (session) {
        this._stateEmmitter.next(true);
      }
    });
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

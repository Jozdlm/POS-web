import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '@app/common/services/supabase.service';
import { LoginCredentials } from '../models/login-credentials';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

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

  public async login(credentials: LoginCredentials) {
    let { error } = await this._db.auth.signInWithPassword(credentials);

    if (error) {
      throw new Error(error.message);
    }

    this._router.navigateByUrl('/');
  }

  public async logOut(): Promise<void> {
    let { error } = await this._db.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    this._router.navigateByUrl('/auth');
  }
}

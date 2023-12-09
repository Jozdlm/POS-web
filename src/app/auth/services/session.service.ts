import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '@app/core/services/supabase.service';
import { LoginCredentials } from '../models/login-credentials';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly _supaService = inject(SupabaseService);
  private readonly _router = inject(Router);
  private readonly _db = this._supaService.supabase;
  private readonly _stateEmmitter = new BehaviorSubject<boolean>(false);

  public isClientLogged$: Observable<boolean> =
    this._stateEmmitter.asObservable();

  constructor() {
    this._db.auth.getSession().then((value) => {
      if (value.data.session) {
        this._stateEmmitter.next(true);
      }
    });

    this._db.auth.onAuthStateChange((event, _) => {
      if (event == 'SIGNED_IN') {
        this._stateEmmitter.next(true);
      } else {
        this._stateEmmitter.next(false);
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

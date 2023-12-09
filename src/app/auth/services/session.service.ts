import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '@app/core/services/supabase.service';
import { LoginCredentials } from '../models/login-credentials';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly _supaService = inject(SupabaseService);
  private readonly _router = inject(Router);
  private readonly _db = this._supaService.supabase;
  public isClientLogged: boolean = false;

  constructor() {
    this._db.auth.onAuthStateChange((event, _) => {
      if (event == 'SIGNED_IN') {
        this.isClientLogged = true;
      } else {
        this.isClientLogged = false;
      }
    });
  }

  public async login(credentials: LoginCredentials) {
    let { error } = await this._db.auth.signInWithPassword(credentials);

    if (error) {
      throw new Error(error.message);
    }

    this._router.navigateByUrl('/quotations');
  }

  public async logOut(): Promise<void> {
    let { error } = await this._db.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    this._router.navigateByUrl('/auth');
  }
}

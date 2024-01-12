import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '@app/common';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbContext {
  private readonly _db = inject(SupabaseService).supabase;

  public findAll<T>(
    tableName: string,
  ): Observable<PostgrestSingleResponse<T[]>> {
    return from(this._db.from(tableName).select('*'));
  }
}

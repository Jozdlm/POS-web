import { Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { supaClient } from './constants';

@Injectable({
  providedIn: 'root',
})
export class DbContext {
  private readonly _db = supaClient;

  public findAll<T>(
    tableName: string,
  ): Observable<PostgrestSingleResponse<T[]>> {
    return from(this._db.from(tableName).select('*'));
  }
}

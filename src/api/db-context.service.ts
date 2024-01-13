import { Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { supabaseClient } from './constants';

@Injectable({
  providedIn: 'root',
})
export class DbContext {
  private readonly _db = supabaseClient;

  public findAll<T>(
    tableName: string,
  ): Observable<PostgrestSingleResponse<T[]>> {
    return from(this._db.from(tableName).select('*'));
  }

  public find<T>(
    tableName: string,
    property: string,
    value: any,
  ): Observable<PostgrestSingleResponse<T[]>> {
    return from(this._db.from(tableName).select('*').eq(property, value));
  }
}

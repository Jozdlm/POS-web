import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '@app/common/services/supabase.service';
import { Observable, from, map } from 'rxjs';
import { School } from '../models/school';
import { DbTables } from '@app/common/enums/db-tables';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private readonly _db = inject(SupabaseService).supabase;

  constructor() {}

  public getSchools(): Observable<School[]> {
    return from(this._db.from(DbTables.SCHOOLS).select('*')).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return data as School[];
      }),
    );
  }
}

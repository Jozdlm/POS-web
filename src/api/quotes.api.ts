import { Observable, from, map } from 'rxjs';
import { SUPABASE_CLIENT } from './constants';
import { DbTables } from './db-tables.enum';

export function getQuotes<T>(): Observable<T> {
  return from(
    SUPABASE_CLIENT.from(DbTables.QUOTATIONS)
      .select(
        `*, ${DbTables.SCHOOL_GRADES}(name), ${DbTables.SCHOOLS}(name), ${DbTables.PROMOTION_TYPE}(description)`,
      )
      .order('id', { ascending: true }),
  ).pipe(
    map(({ error, data }) => {
      if (error) throw new Error(error.message);

      return data as T;
    }),
  );
}

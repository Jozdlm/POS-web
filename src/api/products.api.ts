import { Observable, from, map } from 'rxjs';
import { SUPABASE_CLIENT } from './constants';
import { DbTables } from './db-tables.enum';

export function getProductRowCount(): Observable<number> {
  return from(
    SUPABASE_CLIENT.from(DbTables.PRODUCTS).select('*', {
      count: 'exact',
      head: true,
    }),
  ).pipe(
    map(({ count, error }) => {
      if (error) throw new Error(error?.message);

      return count || 0;
    }),
  );
}

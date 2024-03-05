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

export function getProductById<T>(productId: number): Observable<T> {
  return from(
    SUPABASE_CLIENT.from(DbTables.PRODUCTS).select('*').eq('id', productId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as T;
    }),
  );
}

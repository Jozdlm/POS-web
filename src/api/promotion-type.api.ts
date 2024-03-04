import { SUPABASE_CLIENT } from './constants';
import { Observable, from, map } from 'rxjs';
import { DbTables } from './db-tables.enum';

export function getPromotionTypeById<T>(promoId: number): Observable<T> {
  return from(
    SUPABASE_CLIENT.from(DbTables.PROMOTION_TYPE).select('*').eq('id', promoId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as T;
    }),
  );
}

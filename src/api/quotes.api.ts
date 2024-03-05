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

export function getQuoteById<T>(quoteId: number): Observable<T> {
  return from(
    SUPABASE_CLIENT.from(DbTables.QUOTATIONS)
      .select(
        `*, ${DbTables.SCHOOL_GRADES}(name), ${DbTables.SCHOOLS}(name), ${DbTables.PROMOTION_TYPE}(description)`,
      )
      .eq('id', quoteId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as T;
    }),
  );
}

export function getQuoteItems<T>(quoteId: number): Observable<T> {
  if (quoteId === 0) throw new Error('The Id value must be grater than 0');

  return from(
    SUPABASE_CLIENT.from(DbTables.QUOTATION_ITEMS)
      .select(`*, ${DbTables.PRODUCTS}(name)`)
      .eq('quotation_id', quoteId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data as T;
    }),
  );
}

export function createQuote<T, U>(metadata: T): Observable<U> {
  return from(
    SUPABASE_CLIENT.from(DbTables.QUOTATIONS).insert(metadata).select(),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as U;
    }),
  );
}

export function createQuoteItems<T>(items: T): Observable<number> {
  return from(
    SUPABASE_CLIENT.from(DbTables.QUOTATION_ITEMS).insert(items),
  ).pipe(
    map(({ status, error }) => {
      if (error) throw new Error(error.message);

      return status;
    }),
  );
}

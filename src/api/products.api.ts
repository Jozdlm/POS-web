import { Observable, from, map } from 'rxjs';
import { SUPABASE_CLIENT } from './constants';
import { DbTables } from './db-tables.enum';

interface QueryOptions {
  limit?: number;
  orderBy?: {
    field: string;
    ascending: boolean;
  };
}

export function getProducts<T>(options?: QueryOptions): Observable<T> {
  let dbQuery = SUPABASE_CLIENT.from(DbTables.PRODUCTS).select('*');

  if (options?.orderBy) {
    dbQuery = dbQuery.order(options.orderBy.field, {
      ascending: options.orderBy.ascending,
    });
  }

  if (options?.limit) {
    dbQuery = dbQuery.range(0, options.limit - 1);
  }

  return from(dbQuery).pipe(
    map(({ data, error }) => {
      if (error) {
        throw new Error(error.message);
      }

      return data as T;
    }),
  );
}

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

export function createProduct<T>(dto: T): Observable<number> {
  return from(SUPABASE_CLIENT.from(DbTables.PRODUCTS).insert(dto)).pipe(
    map(({ status, error }) => {
      if (error) throw new Error(error.message);

      return status;
    }),
  );
}

export function updateProduct<T>(
  productId: number,
  dto: T,
): Observable<number> {
  return from(
    SUPABASE_CLIENT.from(DbTables.PRODUCTS).update(dto).eq('id', productId),
  ).pipe(
    map(({ status, error }) => {
      if (error) throw new Error(error.message);

      return status;
    }),
  );
}

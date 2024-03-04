import { SUPABASE_CLIENT } from './constants';
import { Observable, from, map } from 'rxjs';
import { DbTables } from './db-tables.enum';

export function getCategories<T>(): Observable<T> {
  return from(
    SUPABASE_CLIENT.from(DbTables.CATEGORIES)
      .select('*')
      .order('id', { ascending: true }),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data as T;
    }),
  );
}

export function getCategoryById<T>(categoryId: number): Observable<T> {
  return from(
    SUPABASE_CLIENT.from(DbTables.CATEGORIES).select('*').eq('id', categoryId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as T;
    }),
  );
}

export function createCategory<T>(dto: T): Observable<number> {
  return from(SUPABASE_CLIENT.from(DbTables.CATEGORIES).insert(dto)).pipe(
    map(({ status, error }) => {
      if (error) throw new Error(error.message);

      return status;
    }),
  );
}

export function updateCategory<T>(
  dto: T,
  categoryId: number,
): Observable<number> {
  return from(
    SUPABASE_CLIENT.from(DbTables.CATEGORIES).update(dto).eq('id', categoryId),
  ).pipe(
    map(({ status, error }) => {
      if (error) throw new Error(error.message);

      return status;
    }),
  );
}

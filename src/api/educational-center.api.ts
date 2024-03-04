import { Observable, from, map } from 'rxjs';
import { SUPABASE_CLIENT } from './constants';
import { DbTables } from './db-tables.enum';

export function getEducationalCenters<T>(): Observable<T> {
  return from(
    SUPABASE_CLIENT.from(DbTables.SCHOOLS)
      .select('*')
      .order('id', { ascending: true }),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data as T;
    }),
  );
}

export function getEducationalCenterById<T>(schoolId: number): Observable<T> {
  return from(
    SUPABASE_CLIENT.from(DbTables.SCHOOLS).select('*').eq('id', schoolId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as T;
    }),
  );
}

export function createEduCenter<T>(dto: T): Observable<number> {
  return from(SUPABASE_CLIENT.from(DbTables.SCHOOLS).insert(dto)).pipe(
    map(({ status, error }) => {
      if (error) throw new Error(error.message);

      return status;
    }),
  );
}

export function updateEduCenter<T>(
  dto: T,
  schoolId: number,
): Observable<number> {
  return from(
    SUPABASE_CLIENT.from(DbTables.SCHOOLS).update(dto).eq('id', schoolId),
  ).pipe(
    map(({ status, error }) => {
      if (error) throw new Error(error.message);

      return status;
    }),
  );
}

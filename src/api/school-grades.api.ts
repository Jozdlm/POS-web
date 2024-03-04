import { SUPABASE_CLIENT } from './constants';
import { Observable, from, map } from 'rxjs';
import { DbTables } from './db-tables.enum';

export function getSchoolGrades<T>(): Observable<T> {
  return from(SUPABASE_CLIENT.from(DbTables.SCHOOL_GRADES).select('*')).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data as T;
    }),
  );
}

export function getSchoolGradeById<T>(gradeId: number): Observable<T> {
  return from(
    SUPABASE_CLIENT.from(DbTables.SCHOOL_GRADES).select('*').eq('id', gradeId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as T;
    }),
  );
}

import { DbTables } from '@app/common';
import { SchoolGrade } from '@app/quotes/models/school-grades';
import { SUPABASE_CLIENT } from './constants';
import { Observable, from, map } from 'rxjs';

export function getSchoolGrades(): Observable<SchoolGrade[]> {
  return from(SUPABASE_CLIENT.from(DbTables.SCHOOL_GRADES).select('*')).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data as SchoolGrade[];
    }),
  );
}

export function getSchoolGradeById(gradeId: number): Observable<SchoolGrade> {
  return from(
    SUPABASE_CLIENT.from(DbTables.SCHOOL_GRADES).select('*').eq('id', gradeId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as SchoolGrade;
    }),
  );
}

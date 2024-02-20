import { Injectable, inject } from '@angular/core';
import { SchoolGrade } from '../../schools/models/school-grades';
import { DbTables } from '@app/common/enums/db-tables';
import { Observable, map } from 'rxjs';
import { DbContext } from '@api/db-context.service';

@Injectable({
  providedIn: 'root',
})
export class SchoolGradeService {
  private readonly _dbContext = inject(DbContext);

  public getSchoolGrades(): Observable<SchoolGrade[]> {
    return this._dbContext.findAll<SchoolGrade>(DbTables.SCHOOL_GRADES).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return data as SchoolGrade[];
      }),
    );
  }

  public getGradeById(gradeId: number): Observable<SchoolGrade> {
    return this._dbContext
      .find<SchoolGrade>(DbTables.SCHOOL_GRADES, 'id', gradeId)
      .pipe(
        map(({ data, error }) => {
          if (error) throw new Error(error.message);

          return data[0] as SchoolGrade;
        }),
      );
  }
}

import { Injectable } from '@angular/core';
import { SchoolGrade } from '../models/school-grades';
import { Observable } from 'rxjs';
import { API } from '@api/index';

@Injectable({
  providedIn: 'root',
})
export class SchoolGradeService {
  public getSchoolGrades(): Observable<SchoolGrade[]> {
    return API.getSchoolGrades<SchoolGrade[]>();
  }

  public getGradeById(gradeId: number): Observable<SchoolGrade> {
    return API.getSchoolGradeById<SchoolGrade>(gradeId);
  }
}

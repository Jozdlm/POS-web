import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { School, SchoolDto, SchoolMutation } from './school';
import { SchoolMapper } from './school.mapper';
import { API } from '@api/index';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  public getSchools(): Observable<School[]> {
    return API.getEducationalCenters<SchoolDto[]>().pipe(
      map((response) => {
        return response.map((item) => SchoolMapper.toEntity(item));
      }),
    );
  }

  public getSchoolById(schoolId: number): Observable<School> {
    return API.getEducationalCenterById<SchoolDto>(schoolId).pipe(
      map((response) => {
        return SchoolMapper.toEntity(response);
      }),
    );
  }

  public createSchool(data: SchoolMutation): Observable<boolean> {
    const dto = SchoolMapper.toDto(data);

    return API.createEduCenter(dto).pipe(
      map((response) => {
        return response === 201 ? true : false;
      }),
    );
  }

  public updateSchool(
    data: SchoolMutation,
    schoolId: number,
  ): Observable<boolean> {
    const dto = SchoolMapper.toDto(data);

    return API.updateEduCenter(dto, schoolId).pipe(
      map((response) => {
        return response === 204 ? true : false;
      }),
    );
  }
}

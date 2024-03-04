import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '@app/common/services/supabase.service';
import { Observable, from, map } from 'rxjs';
import {
  CreateSchool,
  School,
  SchoolDto,
  UpdateSchool,
} from '../models/school';
import { DbTables } from '@api/db-tables.enum';
import { SchoolMapper } from '../school.mapper';
import { API } from '@api/index';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private readonly _db = inject(SupabaseService).supabase;

  constructor() {}

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

  public createSchool(data: CreateSchool): Observable<boolean> {
    const dto = SchoolMapper.toDto(data);

    return API.createEduCenter(dto).pipe(
      map((response) => {
        return response === 201 ? true : false;
      }),
    );
  }

  public updateSchool(
    data: UpdateSchool,
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

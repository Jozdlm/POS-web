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

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private readonly _db = inject(SupabaseService).supabase;

  constructor() {}

  public getSchools(): Observable<School[]> {
    return from(
      this._db
        .from(DbTables.SCHOOLS)
        .select('*')
        .order('id', { ascending: true }),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return (data as SchoolDto[]).map((item) => SchoolMapper.toEntity(item));
      }),
    );
  }

  public getSchoolById(schoolId: number): Observable<School> {
    return from(
      this._db.from(DbTables.SCHOOLS).select('*').eq('id', schoolId),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return SchoolMapper.toEntity(data[0] as SchoolDto);
      }),
    );
  }

  public createSchool(data: CreateSchool): Observable<boolean> {
    const dto = SchoolMapper.toDto(data);

    return from(this._db.from(DbTables.SCHOOLS).insert(dto)).pipe(
      map(({ status, error }) => {
        if (error) throw new Error(error.message);

        return status === 201 ? true : false;
      }),
    );
  }

  public updateSchool(
    data: UpdateSchool,
    schoolId: number,
  ): Observable<boolean> {
    const dto = SchoolMapper.toDto(data);

    return from(
      this._db.from(DbTables.SCHOOLS).update(dto).eq('id', schoolId),
    ).pipe(
      map(({ status, error }) => {
        if (error) throw new Error(error.message);

        return status === 204 ? true : false;
      }),
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { SupabaseService } from '@app/common/services/supabase.service';
import { DbTables } from '@app/common/enums/db-tables';
import { Category, CategoryDto } from '../models/category';
import { CategoryMapper } from '../category.mapper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _db = inject(SupabaseService).supabase;

  constructor() {}

  public getCategories(): Observable<Category[]> {
    return from(
      this._db
        .from(DbTables.CATEGORIES)
        .select('*')
        .order('id', { ascending: true }),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return (data as CategoryDto[]).map((item) =>
          CategoryMapper.toEntity(item),
        );
      }),
    );
  }

  public getCategoryById(categoryId: number): Observable<Category> {
    return from(
      this._db.from(DbTables.CATEGORIES).select('*').eq('id', categoryId),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        // TODO: Validate if the db has the provided Id
        return CategoryMapper.toEntity(data[0] as CategoryDto);
      }),
    );
  }

  public createCategory(data: Category): Observable<boolean> {
    const dto = CategoryMapper.toDto(data);

    return from(this._db.from(DbTables.CATEGORIES).insert(dto)).pipe(
      map(({ status, error }) => {
        if (error) throw new Error(error.message);

        return status === 201 ? true : false;
      }),
    );
  }

  public updateCategory(
    data: Category,
    categoryId: number,
  ): Observable<boolean> {
    const dto = CategoryMapper.toDto(data);

    return from(
      this._db.from(DbTables.CATEGORIES).update(dto).eq('id', categoryId),
    ).pipe(
      map(({ status, error }) => {
        if (error) throw new Error(error.message);

        return status === 204 ? true : false;
      }),
    );
  }
}

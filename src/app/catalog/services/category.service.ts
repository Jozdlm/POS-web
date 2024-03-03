import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { SupabaseService } from '@app/common/services/supabase.service';
import { DbTables } from '@app/common/enums/db-tables';
import { Category } from '../models/category';
import { CategoryMapper } from '../category.mapper';
import { API } from '@api/categories.api';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _db = inject(SupabaseService).supabase;

  constructor() {}

  public getCategories(): Observable<Category[]> {
    return API.getCategories().pipe(
      map((data) => {
        return data.map((item) => CategoryMapper.toEntity(item));
      }),
    );
  }

  public getCategoryById(categoryId: number): Observable<Category> {
    return API.getCategoryById(categoryId).pipe(
      map((record) => {
        return CategoryMapper.toEntity(record);
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

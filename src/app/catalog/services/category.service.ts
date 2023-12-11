import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { SupabaseService } from '@app/core/services/supabase.service';
import { DbTables } from '@app/core/enums/db-tables';
import { Category, CategoryDto } from '../models/category';
import { CategoryMapper } from '../mappers/category.mapper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _db = inject(SupabaseService).supabase;

  constructor() {}

  public getCategories(): Observable<Category[]> {
    return from(this._db.from(DbTables.CATEGORIES).select('*')).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return (data as CategoryDto[]).map((item) =>
          CategoryMapper.toEntity(item),
        );
      }),
    );
  }
}

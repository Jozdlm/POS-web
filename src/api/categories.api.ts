import { DbTables } from '@app/common';
import { SUPABASE_CLIENT } from './constants';
import { Observable, from, map } from 'rxjs';
import { CategoryDto } from '@app/catalog/models/category';

export function apiGetCategories(): Observable<CategoryDto[]> {
  return from(
    SUPABASE_CLIENT.from(DbTables.CATEGORIES)
      .select('*')
      .order('id', { ascending: true }),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data as CategoryDto[];
    }),
  );
}

export function apiGetCategoryById(
  categoryId: number,
): Observable<CategoryDto> {
  return from(
    SUPABASE_CLIENT.from(DbTables.CATEGORIES).select('*').eq('id', categoryId),
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data[0] as CategoryDto;
    }),
  );
}

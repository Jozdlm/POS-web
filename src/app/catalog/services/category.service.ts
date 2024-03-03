import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';
import { CategoryMapper } from '../category.mapper';
import { API } from '@api/index';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
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

    return API.createCategory(dto).pipe(
      map((status) => {
        return status === 201 ? true : false;
      }),
    );
  }

  public updateCategory(
    data: Category,
    categoryId: number,
  ): Observable<boolean> {
    const dto = CategoryMapper.toDto(data);

    return API.updateCategory(dto, categoryId).pipe(
      map((status) => {
        return status === 204 ? true : false;
      }),
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { SupabaseService } from '@app/common/services/supabase.service';
import { DbTables } from '@app/common/enums/db-tables';
import { ProductMapper } from '../product.mapper';
import {
  Product,
  ProductDto,
  ProductMutation,
} from '@app/catalog/models/product';
import { FilterData } from '@app/common/interfaces/filter-data';
import { stringToTitleCase } from '@app/common/utils/string-title-case';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _db = inject(SupabaseService).supabase;

  constructor() {}

  public getProductCount(): Observable<number> {
    return from(
      this._db
        .from(DbTables.PRODUCTS)
        .select('*', { count: 'exact', head: true }),
    ).pipe(
      map(({ count, error }) => {
        if (error) throw new Error(error?.message);

        return count || 0;
      }),
    );
  }

  public getProducts(): Observable<Product[]> {
    return from(
      this._db
        .from(DbTables.PRODUCTS)
        .select('*')
        .order('id', { ascending: true })
        .range(0, 49),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }

        return (data as ProductDto[]).map((item) =>
          ProductMapper.toEntity(item),
        );
      }),
    );
  }

  public getProductsBy({
    query,
    field,
    limit,
  }: FilterData): Observable<Product[]> {
    query = stringToTitleCase(query);

    return from(
      this._db
        .from(DbTables.PRODUCTS)
        .select('*')
        .ilike(field, `%${query}%`)
        .range(0, limit - 1),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }

        return (data as ProductDto[]).map((item) =>
          ProductMapper.toEntity(item),
        );
      }),
    );
  }

  public getProductById(productId: number): Observable<Product> {
    return from(
      this._db.from(DbTables.PRODUCTS).select('*').eq('id', productId),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);

        return ProductMapper.toEntity(data[0] as ProductDto);
      }),
    );
  }

  public createProduct(data: ProductMutation): Observable<boolean> {
    const dto: ProductDto = ProductMapper.toDto(data);

    return from(this._db.from(DbTables.PRODUCTS).insert(dto)).pipe(
      map(({ status, error }) => {
        if (error) throw new Error(error.message);

        return status === 201 ? true : false;
      }),
    );
  }

  public updateProduct(
    productId: number,
    data: ProductMutation,
  ): Observable<boolean> {
    const dto: ProductDto = ProductMapper.toDto(data);

    return from(
      this._db.from(DbTables.PRODUCTS).update(dto).eq('id', productId),
    ).pipe(
      map(({ status, error }) => {
        if (error) throw new Error(error.message);

        return status === 204 ? true : false;
      }),
    );
  }
}

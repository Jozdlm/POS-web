import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { SupabaseService } from '@app/core/services/supabase.service';
import { DbTables } from '@app/core/enums/db-tables';
import { ProductMapper } from '../mappers/product.mapper';
import { Product, ProductDto } from '@app/quotations/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _db = inject(SupabaseService).supabase;

  constructor() {}

  // TODO: Make a type that set the columns that user can search (property: SearchableCols)
  public getProductsBy(query: string, property: string): Observable<Product[]> {
    return from(
      this._db
        .from(DbTables.PRODUCTS)
        .select('*')
        .like(property, `%${query}%`)
        .range(0, 7),
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
}

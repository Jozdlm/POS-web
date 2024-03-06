import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductMapper } from '../product.mapper';
import {
  Product,
  ProductDto,
  ProductMutation,
} from '@app/catalog/models/product';
import { API } from '@api/index';

interface RequestFilters {
  filterBy?: {
    column: string;
    value: string;
  };
  orderBy?: {
    field: string;
    ascending: boolean;
  };
  limit?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public getProductCount(): Observable<number> {
    return API.getProductRowCount();
  }

  public getProducts(filters?: RequestFilters): Observable<Product[]> {
    return API.getProducts<ProductDto[]>(filters).pipe(
      map((response) => {
        return response.map((item) => ProductMapper.toEntity(item));
      }),
    );
  }

  public getProductById(productId: number): Observable<Product> {
    return API.getProductById<ProductDto>(productId).pipe(
      map((response) => {
        return ProductMapper.toEntity(response);
      }),
    );
  }

  public createProduct(data: ProductMutation): Observable<boolean> {
    const dto: ProductDto = ProductMapper.toDto(data);

    return API.createProduct(dto).pipe(
      map((response) => {
        return response === 201 ? true : false;
      }),
    );
  }

  public updateProduct(
    productId: number,
    data: ProductMutation,
  ): Observable<boolean> {
    const dto: ProductDto = ProductMapper.toDto(data);

    return API.updateProduct(productId, dto).pipe(
      map((response) => {
        return response === 204 ? true : false;
      }),
    );
  }
}

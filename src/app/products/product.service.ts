import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _http = inject(HttpClient);

  constructor() {}

  public getProducts(): Observable<Product[]> {
    return this._http
      .get<Product[]>('https://localhost:7242/api/products')
      .pipe(
        map((data: any[]) => data.map(this._fmtProduct))
      );
  }

  private _fmtProduct(product: any): Product {
    return <Product>{
      ...product,
      code: product.barcode,
      category: product.category.name,
      active: product.active ? 'Activo' : 'Desactivado',
    };
  }
}

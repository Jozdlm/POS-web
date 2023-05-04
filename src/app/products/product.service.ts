import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category, Product, ProductDto } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _http = inject(HttpClient);

  constructor() {}

  public getProducts(): Observable<Product[]> {
    return this._http
      .get<Product[]>('https://localhost:7242/api/products')
      .pipe(map((data: any[]) => data.map(this._fmtProduct)));
  }

  public getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(
      'https://localhost:7242/api/products-categories'
    );
  }

  public createProduct(newProduct: ProductDto) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._http.post(
      'https://localhost:7242/api/products',
      newProduct,
      httpOptions
    );
  }

  private _fmtProduct(product: any): Product {
    return <Product>{
      ...product,
      category: product.category.name,
      active: product.active ? 'Activo' : 'Desactivado',
    };
  }
}

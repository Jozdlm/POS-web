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
    return this._http.get<Product[]>('https://localhost:7242/api/products');
  }

  public getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(`https://localhost:7242/api/products/${id}`);
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

  public updateProduct(id: number, updatedProduct: ProductDto) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this._http.put(
      `https://localhost:7242/api/products/${id}`,
      updatedProduct,
      httpOptions
    );
  }

  public deleteProduct(id: number) {
    return this._http.delete(`https://localhost:7242/api/products/${id}`);
  }
}

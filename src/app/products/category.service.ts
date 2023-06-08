import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = 'https://localhost:7242/api';

  constructor() { }

  public getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(`${this._apiUrl}/products-categories`);
  }
}

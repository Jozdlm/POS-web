import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@app/catalog/services/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '@app/catalog/services/category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private readonly _productService = inject(ProductService);
  public readonly categories$ = inject(CategoryService).getCategories();
  public readonly productCount$ = this._productService.getProductCount();
  public readonly products$ = this._productService.getProducts();
  public diplayFilters: boolean = false;
  public searchControl = new FormControl('');

  public toggleDisplayFilters(): void {
    this.diplayFilters = !this.diplayFilters;
  }
}

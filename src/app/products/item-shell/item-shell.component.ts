import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { Category, Product, ProductDto } from '../product';
import { ItemFormComponent } from '../item-form/item-form.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-shell',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, ItemListComponent, ReactiveFormsModule],
  templateUrl: './item-shell.component.html',
  styleUrls: ['./item-shell.component.scss']
})
export class ItemShellComponent {
  private _productService = inject(ProductService);
  private _formBuilder = inject(FormBuilder);

  public products: Product[] = [];
  public categories: Category[] = [];

  public searchForm = this._formBuilder.group({
    query: ['', Validators.required]
  })

  constructor() {
    this._productService.getProducts().subscribe({
      next: (products) => this.products = products
    })

    this._productService.getCategories().subscribe({
      next: (categories) => this.categories = categories
    })
  }

  public createProduct(productDto: ProductDto): void {
    this._productService.createProduct(productDto).subscribe({
      next: (res) => {
        console.log(res);

        this._productService.getProducts().subscribe({
          next: (products) => (this.products = products)
        });
      }
    });
  }

  public deleteProduct(id: number): void {
    this._productService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res); // Se recibe la respuesta de exito

        this._productService.getProducts().subscribe({
          next: (products) => (this.products = products),
        });
      },
    });
  }
}

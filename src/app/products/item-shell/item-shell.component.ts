import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { Product, ProductDto } from '../product';
import { ItemFormComponent } from '../item-form/item-form.component';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'app-item-shell',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, ItemListComponent],
  templateUrl: './item-shell.component.html',
  styleUrls: ['./item-shell.component.scss']
})
export class ItemShellComponent {
  private _productService = inject(ProductService);

  public products: Product[] = [];

  constructor() {
    this._productService.getProducts().subscribe({
      next: (products) => this.products = products
    })
  }

  public createProduct(productDto: ProductDto): void {
    console.log(productDto);
  }

  public updateProduct(id: number): void {
    console.log(id);
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

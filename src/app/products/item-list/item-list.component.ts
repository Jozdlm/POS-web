import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  private _productService = inject(ProductService);

  public products$ = this._productService.getProducts();

  public updateProduct(id: number): void {
    this._productService.getProductById(id).subscribe({
      next: (res) => console.log(res)
    })
  }

  public deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.products$ = this._productService.getProducts();
      }
    })
  }
}

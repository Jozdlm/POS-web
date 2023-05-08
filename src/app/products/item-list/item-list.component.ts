import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { RouterModule } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  private _productService = inject(ProductService);

  @Input()
  public products: Product[] = [];

  @Output()
  public onDeleteProduct = new EventEmitter<number>();

  public updateProduct(id: number): void {
    this._productService.getProductById(id).subscribe({
      next: (res) => console.log(res)
    })
  }

  public deleteProduct(id: number) {
    this.onDeleteProduct.emit(id);
  }
}

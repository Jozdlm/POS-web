import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { ItemFormComponent } from '../item-form/item-form.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ItemFormComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  private _productService = inject(ProductService);

  public products$ = this._productService.getProducts();

  public deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.products$ = this._productService.getProducts();
      }
    })
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, ItemFormComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  private _productService = inject(ProductService);

  public products$ = this._productService.getProducts();
}

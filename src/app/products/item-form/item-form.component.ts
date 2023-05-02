import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent {
  private _productService = inject(ProductService);

  public categories$ = this._productService.getCategories();
}

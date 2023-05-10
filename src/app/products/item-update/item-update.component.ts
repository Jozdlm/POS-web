import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-item-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss'],
})
export class ItemUpdateComponent {
  private _productService = inject(ProductService);
  private _formBuilder = inject(FormBuilder);

  public itemForm = this._formBuilder.group({
    barcode: [''],
    product_name: ['', Validators.required],
    category_id: [0, [Validators.required, Validators.min(1)]],
    min_stock: [0, [Validators.required, Validators.min(0)]],
    selling_price: [0, [Validators.required, Validators.min(0)]],
    img_url: [''],
    active: [1, [Validators.required]]
  });

  public categories$ = this._productService.getCategories();
}

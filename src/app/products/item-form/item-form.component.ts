import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent {
  private _productService = inject(ProductService);
  private _formBuilder = inject(FormBuilder);

  public categories$ = this._productService.getCategories();

  public itemForm = this._formBuilder.group({
    barcode: [''],
    product_name: ['', Validators.required],
    category_id: [0, [Validators.required, Validators.min(1)]],
    min_stock: [0, [Validators.required, Validators.min(0)]],
    selling_price: [0, [Validators.required, Validators.min(0)]]
  });

  public handleSubmit() {
    if(this.itemForm.valid) {
      console.log(this.itemForm.value);

      this.itemForm.reset();
      this.itemForm.patchValue({category_id: 0});
    }
  }
}

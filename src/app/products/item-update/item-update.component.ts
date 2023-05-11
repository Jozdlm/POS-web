import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'app-item-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss'],
})
export class ItemUpdateComponent {
  private _productService = inject(ProductService);
  private _formBuilder = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);

  public product!: Product;

  public itemForm = this._formBuilder.group({
    barcode: [''],
    product_name: ['', Validators.required],
    category_id: [0, [Validators.required, Validators.min(1)]],
    min_stock: [0, [Validators.required, Validators.min(0)]],
    selling_price: [0, [Validators.required, Validators.min(0)]],
    img_url: [''],
    active: [1, [Validators.required]],
  });

  public categories$ = this._productService.getCategories();

  public constructor() {
    this._activatedRoute.params
      .pipe(
        switchMap(({id}) => {
          return this._productService.getProductById(id);
        })
      )
      .subscribe((product) => {
        this.product = product;
      });
  }

  public handleSubmit(): void {
    console.log(this.itemForm.value);
  }
}

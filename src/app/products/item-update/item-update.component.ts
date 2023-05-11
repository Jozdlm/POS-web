import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Product, ProductDto } from '../product';

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
  private _router = inject(Router);

  public productId: number = 0;

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
      .pipe(switchMap(({ id }) => this._productService.getProductById(id)))
      .subscribe({
        next: (product) => this.setFormValues(product),
        error: () => this.handleErrorHttp(),
      });
  }

  public setFormValues(product: Product): void {
    this.productId = product.id;
    this.itemForm.patchValue({
      barcode: product.barcode,
      product_name: product.product_name,
      min_stock: product.min_stock,
      selling_price: product.selling_price,
      category_id: product.category.id,
      active: Number(product.active),
    });
  }

  public createProductDto(): ProductDto {
    const formValue = { ...this.itemForm.value };
    return {
      category_id: parseInt(`${formValue.category_id}`),
      img_url: '',
      active: formValue.active === 1,
      barcode: formValue.barcode!,
      product_name: formValue.product_name!,
      min_stock: formValue.min_stock!,
      selling_price: formValue.selling_price!,
    };
  }

  public handleErrorHttp(): void {
    this._router.navigate(['/products']);
  }

  public handleSubmit(): void {
    console.log(this.itemForm.value);
  }
}

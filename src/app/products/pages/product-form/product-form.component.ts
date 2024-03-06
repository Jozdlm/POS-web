import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@app/products/categories/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '@app/products/product.service';
import { Subscription, of, switchMap } from 'rxjs';
import { Product } from '@app/products/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _productService = inject(ProductService);
  private readonly _subscriptions = new Subscription();
  public readonly categories$ = inject(CategoryService).getCategories();
  public productId: number | null = null;
  public pageTitle: string = 'Crear producto';

  public productForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    barcode: [''],
    sellingPrice: [0, [Validators.required, Validators.min(0.01)]],
    categoryId: [0, [Validators.required, Validators.min(1)]],
    inStock: [true, Validators.required],
    isActive: [true, Validators.required],
  });

  constructor() {
    this._subscriptions.add(this.getProductDetails());
    inject(DestroyRef).onDestroy(() => this._subscriptions.unsubscribe());
  }

  public getProductDetails(): Subscription {
    return this._activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');

          if (id) {
            this.productId = parseInt(id);
            this.pageTitle = 'Editar producto';
            return this._productService.getProductById(this.productId);
          }

          return of(null);
        }),
      )
      .subscribe((resp) => {
        if (resp) {
          this.setInitialValues(resp);
        }
      });
  }

  public setInitialValues(src: Product): void {
    const { name, barcode, sellingPrice, categoryId, inStock, isActive } = src;
    this.productForm.setValue({
      name,
      barcode,
      sellingPrice,
      categoryId,
      inStock,
      isActive,
    });
  }

  public onSubmitForm(): void {
    if (this.productId) {
      const values = this.productForm.getRawValue();
      this._productService
        .updateProduct(this.productId, { ...values })
        .subscribe({
          next: (_) => this.resetAndReturn(),
          error: (err) => console.log(err),
        });
    } else {
      const values = this.productForm.getRawValue();
      this._productService.createProduct({ ...values }).subscribe({
        next: (_) => this.resetAndReturn(),
        error: (err) => console.log(err),
      });
    }
  }

  public resetAndReturn(): void {
    this.productForm.reset();
    this._router.navigateByUrl('products');
  }
}

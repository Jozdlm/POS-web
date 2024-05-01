import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@app/features/products/categories/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '@app/features/products/product.service';
import { Subscription, of, switchMap } from 'rxjs';
import { Product } from '@app/features/products/product';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mx-auto w-full max-w-[480px]">
      <h1 class="fs-4 mb-4">{{ pageTitle }}</h1>
      <form
        autocomplete="off"
        [formGroup]="productForm"
        (ngSubmit)="onSubmitForm()"
      >
        <div class="mb-3">
          <label for="productName" class="form-label">Producto</label>
          <input
            type="text"
            class="form-control"
            id="productName"
            formControlName="name"
          />
        </div>
        <div class="mb-3">
          <label for="barcode" class="form-label">SKU</label>
          <input
            type="text"
            class="form-control"
            id="barcode"
            formControlName="barcode"
          />
        </div>
        <div class="mb-3">
          <label for="sellingPrice" class="form-label">Precio Venta</label>
          <input
            type="number"
            step="0.01"
            min="0.00"
            class="form-control"
            id="sellingPrice"
            formControlName="sellingPrice"
          />
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Categoría</label>
          <select
            class="form-select"
            id="category"
            formControlName="categoryId"
          >
            <option value="0">Escoge una categoría</option>
            @for (item of categories$ | async; track item.id) {
              <option [value]="item.id">{{ item.name }}</option>
            }
          </select>
        </div>
        <div class="mb-3">
          <label for="stockStatus" class="form-label">Inventario</label>
          <select
            class="form-select"
            id="stockStatus"
            formControlName="inStock"
          >
            <option value="false">Sin existencias</option>
            <option value="true" selected>Con Existencias</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="productStatus" class="form-label">Estado</label>
          <select
            class="form-select"
            id="productStatus"
            formControlName="isActive"
          >
            <option value="false">Desactivado</option>
            <option value="true" selected>Activo</option>
          </select>
        </div>
        <div class="d-flex column-gap-2">
          <button
            type="button"
            class="btn btn-outline-secondary"
            (click)="resetAndReturn()"
          >
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </div>
      </form>
    </div>
  `,
})
export class ProductDetailsPage {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _productService = inject(ProductService);
  private readonly _subscriptions = new Subscription();
  public readonly categories$ = inject(CategoryService).getCategories();
  public productId: number | null = null;
  public pageTitle: string = 'Agregar producto';

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

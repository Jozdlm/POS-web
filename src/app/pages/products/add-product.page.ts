import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@app/features/products/categories/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '@app/features/products/product.service';
import { Subscription, of, switchMap } from 'rxjs';
import { Product } from '@app/features/products/product';
import { InputFieldDirective } from '@app/ui';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFieldDirective],
  template: `
    <div
      class="mx-auto w-full max-w-max rounded-lg border border-slate-300 px-6 py-4"
    >
      <h1 class="text-base mb-4 font-medium text-slate-900">{{ pageTitle }}</h1>
      <form
        class="border-t border-t-slate-300 pt-6"
        autocomplete="off"
        [formGroup]="productForm"
        (ngSubmit)="onSubmitForm()"
      >
        <div class="mb-4">
          <label
            for="productName"
            class="inline-block w-40 font-medium text-gray-700"
            >Producto</label
          >
          <input
            uiInputField
            type="text"
            class="w-80"
            id="productName"
            formControlName="name"
          />
        </div>
        <div class="mb-4">
          <label
            for="barcode"
            class="inline-block w-40 font-medium text-gray-700"
            >Código Barras</label
          >
          <input
            uiInputField
            type="text"
            class="w-80"
            id="barcode"
            formControlName="barcode"
          />
        </div>
        <div class="mb-4">
          <label
            for="sellingPrice"
            class="inline-block w-40 font-medium text-gray-700"
            >Precio Venta</label
          >
          <input
            uiInputField
            type="number"
            step="0.01"
            min="0.00"
            class="w-80"
            id="sellingPrice"
            formControlName="sellingPrice"
          />
        </div>
        <div class="mb-4">
          <label
            for="category"
            class="inline-block w-40 font-medium text-gray-700"
            >Categoría</label
          >
          <select
            class="w-80"
            id="category"
            formControlName="categoryId"
            uiInputField
          >
            <option value="0">Escoge una categoría</option>
            @for (item of categories$ | async; track item.id) {
              <option [value]="item.id">{{ item.name }}</option>
            }
          </select>
        </div>
        <div class="mb-4">
          <label
            for="stockStatus"
            class="inline-block w-40 font-medium text-gray-700"
            >Inventario</label
          >
          <select
            class="w-80"
            id="stockStatus"
            formControlName="inStock"
            uiInputField
          >
            <option value="false">Sin existencias</option>
            <option value="true" selected>Con Existencias</option>
          </select>
        </div>
        <div>
          <label
            for="productStatus"
            class="inline-block w-40 font-medium text-gray-700"
            >Estado</label
          >
          <select
            class="w-80"
            id="productStatus"
            formControlName="isActive"
            uiInputField
          >
            <option value="false">Desactivado</option>
            <option value="true" selected>Activo</option>
          </select>
        </div>
        <div
          class="mt-6 flex justify-end gap-x-3 border-t border-t-slate-300 pt-4"
        >
          <button
            type="button"
            class="rounded-md border border-slate-300 px-3 py-2"
            (click)="resetAndReturn()"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="rounded-md bg-slate-700 px-3 py-2 text-white"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  `,
})
export class AddProductPage {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _productService = inject(ProductService);
  private readonly _subscriptions = new Subscription();
  public readonly categories$ = inject(CategoryService).getCategories();
  public productId: number | null = null;
  public pageTitle: string = 'Agregar nuevo producto';

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

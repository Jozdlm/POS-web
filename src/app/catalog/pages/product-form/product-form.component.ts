import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@app/catalog/services/category.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  private readonly _router = inject(Router);
  public readonly categories$ = inject(CategoryService).getCategories();

  public productForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    barcode: [''],
    sellingPrice: [0, [Validators.required, Validators.min(0.01)]],
    categoryId: [0, [Validators.required, Validators.min(1)]],
    inStock: [true, Validators.required],
    isActive: [true, Validators.required],
  });

  // TODO: Create a method that allows to create a product
  public onSubmitForm(): void {
    console.log('submitted');
  }

  // TODO: Create a method that cancel the operation and reset values
  public resetAndReturn(): void {
    this._router.navigateByUrl('products');
  }
}

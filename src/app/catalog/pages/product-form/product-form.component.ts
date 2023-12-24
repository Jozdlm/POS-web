import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@app/catalog/services/category.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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

  // TODO: Define the reactive form to a product
  public productForm = inject(FormBuilder).nonNullable.group({
    name: [''],
    barcode: [''],
    sellingPrice: [0],
    categoryId: [0],
    inStock: [true],
    isActive: [true],
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

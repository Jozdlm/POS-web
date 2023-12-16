import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@app/catalog/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  private readonly _router = inject(Router);
  public readonly categories$ = inject(CategoryService).getCategories();

  // TODO: Define the reactive form to a product

  // TODO: Create a method that allows to create a product

  // TODO: Create a method that cancel the operation and reset values
  public cancelAndReset(): void {
    this._router.navigateByUrl("products");
  }
}

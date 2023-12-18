import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CategoryService } from '@app/catalog/services/category.service';
import { Category } from '@app/catalog/models/category';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _categoryService = inject(CategoryService);

  // TODO: Generate dinamicly the category slug
  public categoryForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    slug: ['', [Validators.required, Validators.minLength(3)]],
    isActive: [true, Validators.required],
  });

  constructor() {
    // TODO: Handle the unsubscription when the component is destroyed
    this.getCategoryDetails().subscribe((data) => {
      if (data) {
        this.setFormValuesFromDB(data);
      }
    });
  }

  public getCategoryDetails(): Observable<Category | null> {
    return this._activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const categoryId = params.get('id');

        if (!categoryId) return of(null);
        return this._categoryService.getCategoryById(parseInt(categoryId));
      }),
    );
  }

  public setFormValuesFromDB(data: Category): void {
    const { name, description, slug, isActive } = data;
    this.categoryForm.setValue({ name, description, slug, isActive });
  }

  public cancelAndReset(): void {
    this.categoryForm.reset();
    this._router.navigateByUrl('categories');
  }
}

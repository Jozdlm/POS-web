import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  private readonly _route = inject(ActivatedRoute);
  private readonly _categoryService = inject(CategoryService);
  public category$: Observable<Category> | null = null;

  // TODO: Generate dinamicly the category slug
  public categoryForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    slug: ['', [Validators.required, Validators.minLength(3)]],
    isActive: [1, Validators.required],
  });

  constructor() {
    this._route.paramMap.subscribe((params) => {
      const categoryId = params.get('id');

      if (categoryId) {
        this.category$ = this._categoryService.getCategoryById(
          parseInt(categoryId),
        );
      }
    });
  }
}

import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of, switchMap } from 'rxjs';
import { CategoryService } from '@app/features/products/categories/category.service';
import { Category } from '@app/features/products/categories/category';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="wrapper">
      <h1 class="fs-3 mb-4">Crear categoría</h1>
      <form
        [formGroup]="categoryForm"
        (ngSubmit)="saveChanges()"
        autocomplete="off"
      >
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="categoryName"
            placeholder="Nombre"
            formControlName="name"
          />
          <label for="categoryName">Nombre</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="slug"
            placeholder="URL amigable (slug)"
            formControlName="slug"
          />
          <label for="slug">URL amigable (slug)</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="description"
            placeholder="Descripción"
            formControlName="description"
          />
          <label for="description">Descripción</label>
        </div>
        <div class="form-floating mb-4">
          <select
            class="form-select"
            id="categoryState"
            formControlName="isActive"
          >
            <option value="false">Inactivo</option>
            <option value="true">Activo</option>
          </select>
          <label for="categoryState">Estado</label>
        </div>
        <div class="d-flex justify-content-end column-gap-2">
          <button type="button" class="btn" (click)="cancelAndReset()">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </div>
      </form>
    </div>
  `,
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _categoryService = inject(CategoryService);
  private readonly _subscription = new Subscription();
  public categoryId: number | null = null;

  // TODO: Generate dinamicly the category slug
  public categoryForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    slug: ['', [Validators.required, Validators.minLength(3)]],
    isActive: [true, Validators.required],
  });

  constructor() {
    this._subscription.add(this.getDataAndSetFormValues());

    inject(DestroyRef).onDestroy(() => {
      this._subscription.unsubscribe();
    });
  }

  public getDataAndSetFormValues(): Subscription {
    return this.getCategoryDetails().subscribe((data) => {
      if (data) {
        this.setDefaultFormValues(data);
      }
    });
  }

  public getCategoryDetails(): Observable<Category | null> {
    return this._activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');

        if (!id) return of(null);

        this.categoryId = parseInt(id);
        return this._categoryService.getCategoryById(this.categoryId);
      }),
    );
  }

  public setDefaultFormValues(data: Category): void {
    const { name, description, slug, isActive } = data;
    this.categoryForm.setValue({ name, description, slug, isActive });
  }

  public cancelAndReset(): void {
    this.categoryForm.reset();
    this._router.navigateByUrl('categories');
  }

  public createCategory(): void {
    const category = this.categoryForm.getRawValue();

    this._subscription.add(
      this._categoryService
        .createCategory({ ...category })
        // TODO: Shows a toats notification of success
        .subscribe({
          next: (_) => {
            this.cancelAndReset();
          },
          error: (err) => console.error(err),
        }),
    );
  }

  public updateCategory(): void {
    const category = this.categoryForm.getRawValue();

    this._subscription.add(
      this._categoryService
        .updateCategory({ ...category }, this.categoryId!)
        .subscribe({
          next: (_) => {
            this.cancelAndReset();
          },
          // TODO: Shows a toats notification of error
          error: (err) => console.error(err),
        }),
    );
  }

  public saveChanges(): void {
    if (!this.categoryId) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }
}

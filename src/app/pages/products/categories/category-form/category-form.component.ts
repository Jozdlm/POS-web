import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of, switchMap } from 'rxjs';
import { CategoryService } from '@app/features/products/categories/category.service';
import { Category } from '@app/features/products/categories/category';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="mx-auto w-full max-w-[480px]">
      <h1 class="font-lg mb-4">Crear categoría</h1>
      <form
        [formGroup]="categoryForm"
        (ngSubmit)="saveChanges()"
        autocomplete="off"
      >
        <div class="mb-4 flex flex-col">
          <label for="categoryName" class="mb-1 text-sm">Nombre</label>
          <input
            type="text"
            class="rounded-lg border border-slate-400 px-3 py-2 placeholder:text-sm placeholder:text-slate-500"
            id="categoryName"
            placeholder="Utensilios de oficina"
            formControlName="name"
          />
        </div>
        <div class="mb-4 flex flex-col">
          <label for="slug" class="mb-1 text-sm">URL amigable (slug)</label>
          <input
            type="text"
            class="rounded-lg border border-slate-400 px-3 py-2 placeholder:text-sm placeholder:text-slate-500"
            id="slug"
            placeholder="categoria-url-amigable"
            formControlName="slug"
          />
        </div>
        <div class="mb-4 flex flex-col">
          <label for="description" class="mb-1 text-sm">Descripción</label>
          <input
            type="text"
            class="rounded-lg border border-slate-400 px-3 py-2 placeholder:text-sm placeholder:text-slate-500"
            id="description"
            placeholder="Descripción"
            formControlName="description"
          />
        </div>
        <div class="mb-4 flex flex-col">
          <label for="categoryState" class="mb-1 text-sm">Estado</label>
          <select
            class="rounded-lg border border-slate-400 px-3 py-2 placeholder:text-sm placeholder:text-slate-500"
            id="categoryState"
            formControlName="isActive"
          >
            <option value="false">Inactivo</option>
            <option value="true">Activo</option>
          </select>
        </div>
        <div class="flex justify-end gap-x-4">
          <button
            type="button"
            class="rounded-lg border border-slate-200 px-3 py-2"
            (click)="cancelAndReset()"
          >
            Cancelar
          </button>
          <button type="submit" class="rounded-lg bg-slate-200 px-3 py-2">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  `
})
export class CategoryFormComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _categoryService = inject(CategoryService);
  private readonly _subscription = new Subscription();
  public categoryId: number | null = null;

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

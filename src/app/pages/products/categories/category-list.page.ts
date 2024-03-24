import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../features/products/categories/category.service';
import { RouterModule } from '@angular/router';
import { RecordStatusDirective } from '@app/common/directives/record-status.directive';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, RecordStatusDirective],
  template: `
    <div class="mx-auto w-full max-w-screen-md">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="fs-3">Categorías</h1>
        <a class="btn btn-primary" routerLink="add">Nueva Categoría</a>
        <button (click)="openDialog()">Open Dialog</button>
      </div>

      <div class="list-group">
        @for (item of categories$ | async; track item.id) {
          <div
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <p class="fw-medium fs-5 mb-0">
                {{ item.name }}
              </p>
              <p class="mb-2">{{ item.description }}</p>
              <span class="badge rounded-pill" [recordStatus]="item.isActive">
              </span>
            </div>
            <div>
              <a class="btn" [routerLink]="['edit', item.id]">Editar</a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class CategoryListPage {
  private _categoryService = inject(CategoryService);
  private _dialogRef = inject(MatDialog);

  public categories$ = this._categoryService.getCategories();

  public openDialog(): void {
    this._dialogRef.open(CategoryFormComponent, {
      minWidth: 360,
    });
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../categories/category.service';
import { RouterModule } from '@angular/router';
import { RecordStatusDirective } from '@app/common/directives/record-status.directive';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RecordStatusDirective],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  private _categoryService = inject(CategoryService);
  private _dialogRef = inject(MatDialog);

  public categories$ = this._categoryService.getCategories();

  public openDialog(): void {
    this._dialogRef.open(CategoryFormComponent, {
      minWidth: 360,
    });
  }
}

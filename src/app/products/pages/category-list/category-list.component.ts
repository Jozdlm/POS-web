import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../categories/category.service';
import { RouterModule } from '@angular/router';
import { RecordStatusDirective } from '@app/common/directives/record-status.directive';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RecordStatusDirective],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  private _categoryService = inject(CategoryService);

  public categories$ = this._categoryService.getCategories();
}

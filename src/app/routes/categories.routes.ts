import { Routes } from '@angular/router';
import { CategoryListComponent } from '../pages/products/categories/category-list/category-list.component';
import { CategoryFormComponent } from '../pages/products/categories/category-form/category-form.component';

const CATEGORIES_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: CategoryListComponent },
  { path: 'add', component: CategoryFormComponent },
  { path: 'edit/:id', component: CategoryFormComponent },
];

export default CATEGORIES_ROUTES;

import { Routes } from '@angular/router';
import { CategoryListPage } from '../pages/products/categories/category-list.page';
import { CategoryFormComponent } from '../pages/products/categories/category-form/category-form.component';

const CATEGORIES_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: CategoryListPage },
  { path: 'add', component: CategoryFormComponent },
  { path: 'edit/:id', component: CategoryFormComponent },
];

export default CATEGORIES_ROUTES;

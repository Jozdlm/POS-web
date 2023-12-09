import { Routes } from '@angular/router';
import { CategoryListComponent } from './pages/category-list/category-list.component';

const CATEGORIES_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: CategoryListComponent },
];

export default CATEGORIES_ROUTES;

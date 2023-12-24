import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

const PRODUCT_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: ProductListComponent },
  { path: 'add', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent },
  { path: '**', redirectTo: '' },
];

export default PRODUCT_ROUTES;

import { Routes } from '@angular/router';
import { ProductListPage } from '../pages/products/product-list.page';
import { ProductFormComponent } from '../pages/products/product-form/product-form.component';

const PRODUCT_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: ProductListPage },
  { path: 'add', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent },
  { path: '**', redirectTo: '' },
];

export default PRODUCT_ROUTES;

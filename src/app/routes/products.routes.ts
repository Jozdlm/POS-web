import { Routes } from '@angular/router';
import { ProductListPage } from '../pages/products/product-list.page';
import { AddProductPage } from '@app/pages/products/add-product.page';
import { ProductDetailsPage } from '@app/pages/products/product-details.page';

const PRODUCT_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: ProductListPage },
  { path: 'add', component: AddProductPage },
  { path: 'edit/:id', component: ProductDetailsPage },
  { path: '**', redirectTo: '' },
];

export default PRODUCT_ROUTES;

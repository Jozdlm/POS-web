import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';

const PRODUCT_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: ProductListComponent },
];

export default PRODUCT_ROUTES;

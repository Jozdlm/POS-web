import { Routes } from '@angular/router';
import { ShoppingCartPage } from './pages/shopping-cart/shopping-cart.page';

const CASHIER_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShoppingCartPage,
  },
];

export default CASHIER_ROUTES;

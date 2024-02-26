import { Routes } from '@angular/router';
import { anonClientGuard } from './auth/guards/anon-client.guard';
import { loggedClientGuard } from './auth/guards/logged-client.guard';
import { PagePrefix } from './common/enums/pages';
import { ManagerLayoutComponent } from './common/layouts/manager-layout/manager-layout.component';

// TODO: Set title property to each route
export const APP_ROUTES: Routes = [
  {
    path: PagePrefix.AUTH,
    canActivate: [anonClientGuard],
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: '',
    component: ManagerLayoutComponent,
    canActivate: [loggedClientGuard],
    children: [
      {
        path: 'overview',
        loadComponent: () => import('./home/home.page').then((c) => c.HomePage),
      },
      {
        path: 'sell',
        loadChildren: () => import('./cashier/cashier.routes'),
      },
      {
        path: PagePrefix.QUOTATIONS,
        loadChildren: () => import('./quotes/quotation.routes'),
      },
      {
        path: PagePrefix.CATEGORIES,
        loadChildren: () => import('./catalog/categories.routes'),
      },
      {
        path: PagePrefix.PRODUCTS,
        loadChildren: () => import('./catalog/products.routes'),
      },
      {
        path: PagePrefix.SCHOOLS,
        redirectTo: 'quotes/educational-centers',
      },
      {
        path: PagePrefix.GRADES,
        redirectTo: 'quotations/school-grades',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
    ],
  },
];

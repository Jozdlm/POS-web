import { Routes } from '@angular/router';
import { anonClientGuard } from './auth/guards/anon-client.guard';
import { loggedClientGuard } from './auth/guards/logged-client.guard';
import { PagePrefix } from './common/enums/pages';
import { ManagerLayoutComponent } from './common/layouts/manager-layout/manager-layout.component';
import { CashierLayoutComponent } from './common/layouts/cashier-layout/cashier-layout.component';

// TODO: Set title property to each route
export const APP_ROUTES: Routes = [
  {
    path: PagePrefix.AUTH,
    canActivate: [anonClientGuard],
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'sell',
    component: CashierLayoutComponent,
    canActivate: [loggedClientGuard],
  },
  {
    path: '',
    component: ManagerLayoutComponent,
    canActivate: [loggedClientGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home.page').then((c) => c.HomePage),
      },
      {
        path: PagePrefix.QUOTATIONS,
        loadChildren: () => import('./quotations/quotation.routes'),
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
        loadChildren: () => import('./schools/schools.routes'),
      },
      {
        path: PagePrefix.GRADES,
        loadComponent: () =>
          import('./schools/pages/school-grades/school-grades.component').then(
            (c) => c.SchoolGradesComponent,
          ),
      },
    ],
  },
];

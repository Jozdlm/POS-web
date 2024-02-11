import { Routes } from '@angular/router';
import { anonClientGuard } from './auth/guards/anon-client.guard';
import { loggedClientGuard } from './auth/guards/logged-client.guard';
import { ViewsShellComponent } from './common/layout/views-shell/views-shell.component';
import { PagePrefix } from './common/enums/pages';
import { ManagerLayoutComponent } from './common/layout/manager-layout/manager-layout.component';
import { CashierLayoutComponent } from './common/layout/cashier-layout/cashier-layout.component';

// TODO: Set title property to each route
export const APP_ROUTES: Routes = [
  {
    path: PagePrefix.AUTH,
    canActivate: [anonClientGuard],
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: '',
    component: ViewsShellComponent,
    canActivate: [loggedClientGuard],
    children: [
      {
        path: '',
        component: ManagerLayoutComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./home/home.page').then((c) => c.HomePage),
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
              import(
                './schools/pages/school-grades/school-grades.component'
              ).then((c) => c.SchoolGradesComponent),
          },
        ],
      },
      {
        path: 'sell',
        component: CashierLayoutComponent,
      }
    ],
  },
];

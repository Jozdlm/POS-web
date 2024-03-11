import { Routes } from '@angular/router';
import { anonClientGuard } from './auth/guards/anon-client.guard';
import { loggedClientGuard } from './auth/guards/logged-client.guard';
import { PagePrefix } from './common/enums/pages';
import { ManagerLayoutComponent } from './ui/layouts/manager-layout.component';

// TODO: Set title property to each route
export const APP_ROUTES: Routes = [
  {
    path: PagePrefix.AUTH,
    canActivate: [anonClientGuard],
    loadChildren: () => import('./pages/auth/auth.routes'),
  },
  {
    path: '',
    component: ManagerLayoutComponent,
    canActivate: [loggedClientGuard],
    children: [
      {
        path: 'overview',
        loadComponent: () =>
          import('./pages/home.page').then((c) => c.HomePage),
      },
      {
        path: PagePrefix.QUOTATIONS,
        loadChildren: () => import('./quotes/quotation.routes'),
      },
      {
        path: PagePrefix.CATEGORIES,
        loadComponent: () =>
          import('./ui/layouts/catalog-layout.component').then(
            (c) => c.CatalogLayoutComponent,
          ),
        loadChildren: () => import('./pages/products/categories/categories.routes'),
      },
      {
        path: PagePrefix.PRODUCTS,
        loadComponent: () =>
          import('./ui/layouts/catalog-layout.component').then(
            (c) => c.CatalogLayoutComponent,
          ),
        loadChildren: () => import('./pages/products/products.routes'),
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

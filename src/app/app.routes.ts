import { Routes } from '@angular/router';
import { anonClientGuard } from './features/auth/guards/anon-client.guard';
import { loggedClientGuard } from './features/auth/guards/logged-client.guard';
import { PagePrefix } from './common/enums/pages';
import { ManagerLayoutComponent } from './ui/layouts/manager-layout.component';

// TODO: Set title property to each route
export const APP_ROUTES: Routes = [
  {
    path: PagePrefix.AUTH,
    canActivate: [anonClientGuard],
    loadChildren: () => import('./routes/auth.routes'),
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
        path: 'pos',
        loadComponent: () => import('./pages/pos.page').then((c) => c.PosPage),
      },
      {
        path: PagePrefix.QUOTATIONS,
        loadChildren: () => import('./routes/quotation.routes'),
      },
      {
        path: PagePrefix.CATEGORIES,
        loadChildren: () => import('./routes/categories.routes'),
      },
      {
        path: PagePrefix.PRODUCTS,
        loadChildren: () => import('./routes/products.routes'),
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

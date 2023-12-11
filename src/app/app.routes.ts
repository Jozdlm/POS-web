import { Routes } from '@angular/router';
import { AddQuotationComponent } from './quotations/pages/add-quotation/add-quotation.component';
import { anonClientGuard } from './auth/guards/anon-client.guard';
import { loggedClientGuard } from './auth/guards/logged-client.guard';
import { QuotationDetailsComponent } from './quotations/pages/quotation-details/quotation-details.component';
import { ViewsShellComponent } from './core/layout/views-shell/views-shell.component';
import { PagePrefix } from './core/enums/pages';

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
        pathMatch: 'full',
        component: AddQuotationComponent,
      },
      // TODO: Define the component for dashboard route
      {
        path: PagePrefix.DASHBOARD,
        redirectTo: '',
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
    ],
  },
  {
    path: PagePrefix.PRINT,
    canActivate: [loggedClientGuard],
    children: [
      {
        path: `quotation/:id`,
        // TODO: Concatenate the app name with the title page
        title: 'Librería La Joya - Imprimir Cotización',
        component: QuotationDetailsComponent,
      },
    ],
  },
];

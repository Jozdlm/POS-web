import { Routes } from '@angular/router';
import { AddQuotationComponent } from './quotations/pages/add-quotation/add-quotation.component';
import { anonClientGuard } from './auth/guards/anon-client.guard';
import { loggedClientGuard } from './auth/guards/logged-client.guard';
import { QuotationDetailsComponent } from './quotations/pages/quotation-details/quotation-details.component';
import { ViewsShellComponent } from './common/layout/views-shell/views-shell.component';
import { PagePrefix } from './common/enums/pages';

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

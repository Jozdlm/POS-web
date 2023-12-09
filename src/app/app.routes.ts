import { Routes } from '@angular/router';
import { ItemDetailsComponent } from './products/item-details/item-details.component';
import { ItemShellComponent } from './products/item-shell/item-shell.component';
import { ItemUpdateComponent } from './products/item-update/item-update.component';
import { CategoryListComponent } from './products/pages/category-list/category-list.component';
import { AddQuotationComponent } from './quotations/pages/add-quotation/add-quotation.component';
import { anonClientGuard } from './auth/guards/anon-client.guard';
import { loggedClientGuard } from './auth/guards/logged-client.guard';
import { QuotationDetailsComponent } from './quotations/pages/quotation-details/quotation-details.component';
import { ViewsShellComponent } from './core/layout/views-shell/views-shell.component';
import { PagePrefix } from './core/enums/pages';

// TODO: Set title property to all routes
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
      { path: PagePrefix.CATEGORIES, component: CategoryListComponent },
      { path: PagePrefix.PRODUCTS, component: ItemShellComponent },
      { path: 'products/edit/:id', component: ItemUpdateComponent },
      { path: 'products/:id', component: ItemDetailsComponent },
    ],
  },
  {
    path: PagePrefix.PRINT,
    canActivate: [loggedClientGuard],
    children: [
      {
        path: `${PagePrefix.QUOTATIONS}/:id`,
        component: QuotationDetailsComponent,
      },
    ],
  },
];

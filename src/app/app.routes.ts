import { Routes } from '@angular/router';
import { ItemDetailsComponent } from './products/item-details/item-details.component';
import { ItemShellComponent } from './products/item-shell/item-shell.component';
import { ItemUpdateComponent } from './products/item-update/item-update.component';
import { CategoryListComponent } from './products/pages/category-list/category-list.component';
import { AppComponent } from './app.component';
import { AddQuotationComponent } from './quotations/pages/add-quotation/add-quotation.component';

// TODO: Defines guards to prevent an anon client to come in to private pages
export const APP_ROUTES: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.routes') },
  {
    path: '',
    children: [
      {
        path: 'quotations',
        loadChildren: () => import('./quotations/quotation.routes'),
      },
      { path: 'categories', component: CategoryListComponent },
      { path: 'products', component: ItemShellComponent },
      { path: 'products/edit/:id', component: ItemUpdateComponent },
      { path: 'products/:id', component: ItemDetailsComponent },
    ],
  },
];

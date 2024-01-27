import { Routes } from '@angular/router';
import { QuotationComponent } from './pages/quotation-list/quotation.component';
import { AddQuotationComponent } from './pages/add-quotation/add-quotation.component';
import { QuotationDetailsComponent } from './pages/quotation-details/quotation-details.component';
import { QuoteItemsComponent } from './pages/add-quotation/tabs/quote-items.component';
import { QuoteHeaderComponent } from './pages/add-quotation/tabs/quote-header.component';
import { QuoteConfirmationComponent } from './pages/add-quotation/tabs/quote-confirmation.component';
import { quoteConfirmationGuard } from '@app/auth/guards/quote-confirmation.guard';

const QUOTATION_ROUTES: Routes = [
  {
    path: '',
    component: QuotationComponent,
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: AddQuotationComponent,
    children: [
      {
        path: '',
        redirectTo: 'cart',
        pathMatch: 'full',
      },
      { path: 'cart', component: QuoteItemsComponent },
      { path: 'quote-info', component: QuoteHeaderComponent },
      {
        path: 'confirmation',
        component: QuoteConfirmationComponent,
        canActivate: [quoteConfirmationGuard],
      },
    ],
  },
  { path: ':id', component: QuotationDetailsComponent },
];

export default QUOTATION_ROUTES;

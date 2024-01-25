import { Routes } from '@angular/router';
import { QuotationComponent } from './pages/quotation-list/quotation.component';
import { AddQuotationComponent } from './pages/add-quotation/add-quotation.component';
import { QuotationDetailsComponent } from './pages/quotation-details/quotation-details.component';
import { QuoteItemsComponent } from './pages/add-quotation/molecules/quote-items.component';
import { QuoteHeaderComponent } from './pages/add-quotation/molecules/quote-header.component';
import { QuoteConfirmationComponent } from './pages/add-quotation/molecules/quote-confirmation.component';

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
      { path: 'confirmation', component: QuoteConfirmationComponent },
    ],
  },
  { path: ':id', component: QuotationDetailsComponent },
];

export default QUOTATION_ROUTES;

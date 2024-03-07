import { Routes } from '@angular/router';
import { QuotationComponent } from './pages/quotation-list/quotation.component';
import { AddQuotationPage } from './pages/add-quotation/add-quotation.page';
import { QuotationDetailsComponent } from './pages/quotation-details/quotation-details.component';
import { QuoteItemsComponent } from './pages/add-quotation/tabs/quote-items.component';
import { QuoteHeaderComponent } from './pages/add-quotation/tabs/quote-header.component';
import { QuoteConfirmationComponent } from './pages/add-quotation/tabs/quote-confirmation.component';
import { quoteConfirmationGuard } from '@app/quotes/quote-confirmation.guard';
import { SchoolGradesPage } from './school-grades/school-grades.page';
import { EducationalCentersPage } from './educational-centers/educational-centers.page';
import { SchoolFormComponent } from './pages/school-form/school-form.component';

const QUOTATION_ROUTES: Routes = [
  {
    path: '',
    component: QuotationComponent,
    pathMatch: 'full',
  },
  {
    // TODO: Fix issue related to navigation
    path: 'educational-centers',
    children: [
      { path: '', component: EducationalCentersPage, pathMatch: 'full' },
      { path: 'add-center', component: SchoolFormComponent },
      { path: 'edit-center/:id', component: SchoolFormComponent },
    ],
  },
  {
    path: 'school-grades',
    component: SchoolGradesPage,
  },
  {
    path: 'add',
    component: AddQuotationPage,
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

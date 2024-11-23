import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuotationService } from '../../../features/quotes/quotation.service';
import { Quotation } from '../../../features/quotes/quotation';

@Component({
    imports: [CommonModule, RouterModule],
    templateUrl: './quotation.component.html',
    styleUrl: './quotation.component.scss'
})
export class QuotationComponent {
  private readonly _quotationService = inject(QuotationService);
  public quotations$ = inject(QuotationService).getQuotations();

  constructor() {}
}

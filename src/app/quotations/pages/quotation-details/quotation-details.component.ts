import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationService } from '@app/quotations/services/quotation.service';

@Component({
  selector: 'app-quotation-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotation-details.component.html',
  styleUrl: './quotation-details.component.scss',
})
export class QuotationDetailsComponent {
  private readonly _quotationService = inject(QuotationService);

  constructor() {
    this._quotationService
      .getQuotationById(6)
      .then((quotation) => console.log(quotation))
      .catch((err) => console.error(err));
  }
}

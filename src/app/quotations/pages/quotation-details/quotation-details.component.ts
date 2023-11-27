import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationService } from '@app/quotations/services/quotation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quotation-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotation-details.component.html',
  styleUrl: './quotation-details.component.scss',
})
export class QuotationDetailsComponent {
  private readonly _quotationService = inject(QuotationService);
  private readonly _route = inject(ActivatedRoute);
  public quotationId: number = 0;

  constructor() {
    this._route.paramMap.subscribe(
      (params) => (this.quotationId = Number(params.get('id'))),
    );

    this._quotationService
      .getQuotationById(this.quotationId)
      .then((quotation) => console.log(quotation))
      .catch((err) => console.error(err));
  }
}

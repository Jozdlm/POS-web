import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuotationService } from '../../services/quotation.service';
import { Quotation } from '../../models/quotation';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.scss',
})
export class QuotationComponent {
  private readonly _quotationService = inject(QuotationService);
  public quotations: Quotation[] = [];

  constructor() {
    this._quotationService
      .getQuotations()
      .then((values) => (this.quotations = values))
      .catch((err) => console.error(err));
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationService } from '@app/quotations/services/quotation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationDto } from '@app/quotations/models/quotation';
import { QuotationItemDto } from '@app/quotations/models/quotation-item';

@Component({
  selector: 'app-quotation-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotation-details.component.html',
  styleUrl: './quotation-details.component.scss',
})
export class QuotationDetailsComponent {
  private readonly _quotationService = inject(QuotationService);
  private readonly _activedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  public quotationId: number = 0;
  public quotationHeader: QuotationDto | undefined = undefined;
  public quotationItems: QuotationItemDto[] = [];

  constructor() {
    this._activedRoute.paramMap.subscribe(
      (params) => (this.quotationId = Number(params.get('id'))),
    );

    this._quotationService
      .getQuotationById(this.quotationId)
      .then((quotation) => {
        if (quotation) {
          this.quotationHeader = quotation;
        } else {
          this._router.navigateByUrl('/quotations');
        }
        return this._quotationService.getQuotationItems(this.quotationId);
      })
      .then((items) => {
        this.quotationItems = items;
      })
      .catch((err) => console.error(err));
  }
}

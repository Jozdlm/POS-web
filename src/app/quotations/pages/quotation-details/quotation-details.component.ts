import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationService } from '@app/quotations/services/quotation.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Quotation } from '@app/quotations/models/quotation';
import { QuotationItem } from '@app/quotations/models/quotation-item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quotation-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quotation-details.component.html',
  styleUrl: './quotation-details.component.scss',
})
export class QuotationDetailsComponent {
  private readonly _quotationService = inject(QuotationService);
  private readonly _activedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private _subscription = new Subscription();
  public quotationId: number = 0;
  public quotationHeader: Quotation | undefined = undefined;
  public quotationItems: QuotationItem[] = [];
  public showButtons: boolean = true;

  public get printQuote(): boolean {
    return this._activedRoute.snapshot.url.some(
      (segment) => segment.path === 'quotation',
    );
  }

  constructor() {
    if(this.printQuote) {
      this.showButtons = false;
    }

    this.watchUrlParams();
    this.getQuotationAndItems();

    inject(DestroyRef).onDestroy(() => this._subscription.unsubscribe());
  }

  public watchUrlParams(): void {
    this._subscription.add(
      this._activedRoute.paramMap.subscribe(
        (params) => (this.quotationId = Number(params.get('id'))),
      ),
    );
  }

  public async getQuotationAndItems(): Promise<void> {
    const quotation = await this._quotationService.getQuotationById(
      this.quotationId,
    );

    if (quotation) {
      this.quotationHeader = quotation;

      const items = await this._quotationService.getQuotationItems(
        this.quotationId,
      );
      this.quotationItems = items;
    } else {
      this._router.navigateByUrl('/quotations');
    }
  }
}

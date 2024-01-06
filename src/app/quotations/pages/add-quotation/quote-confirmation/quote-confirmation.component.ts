import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';

@Component({
  selector: 'app-quote-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-confirmation.component.html',
  styleUrl: './quote-confirmation.component.scss',
})
export class QuoteConfirmationComponent {
  private readonly _stateService = inject(QuotationStateService);
  public readonly quoteState = this._stateService.getStateSnapshot();
}

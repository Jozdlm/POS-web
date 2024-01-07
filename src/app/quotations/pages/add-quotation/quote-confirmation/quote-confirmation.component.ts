import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';
import { QuotationService } from '@app/quotations/services/quotation.service';
import { QuoteMutation } from '@app/quotations/models/quotation';

@Component({
  selector: 'app-quote-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-confirmation.component.html',
  styleUrl: './quote-confirmation.component.scss',
})
export class QuoteConfirmationComponent {
  private readonly _stateService = inject(QuotationStateService);
  private readonly _quoteService = inject(QuotationService);
  public readonly quoteState = this._stateService.getStateSnapshot();

  public onCreateQuote(): void {
    const header: QuoteMutation = {
      customerName: this.quoteState.customerName,
      studentName: this.quoteState.studentName,
      date: this.quoteState.date,
      gradeId: this.quoteState.schoolGrade,
      schoolId: this.quoteState.school,
      promotionId: this.quoteState.promotionType,
      totalAmmount: this.quoteState.total,
    };
    const items = this.quoteState.items;

    this._quoteService.createQuotation({ ...header }, items);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';
import { QuotationService } from '@app/quotations/services/quotation.service';
import { QuoteMutation } from '@app/quotations/models/quotation';
import { SchoolService } from '@app/schools/services/school.service';
import { SchoolGradeService } from '@app/schools/services/school-grade.service';
import { PromotionTypeService } from '@app/quotations/services/promotion-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-confirmation.component.html',
  styleUrl: './quote-confirmation.component.scss',
})
export class QuoteConfirmationComponent implements OnInit {
  private readonly _stateService = inject(QuotationStateService);
  private readonly _quoteService = inject(QuotationService);
  private readonly _router = inject(Router);
  private readonly schoolService = inject(SchoolService);
  private readonly gradeService = inject(SchoolGradeService);
  private readonly promoService = inject(PromotionTypeService);
  public readonly quoteState = this._stateService.getStateSnapshot();
  public schoolName: string = '';
  public gradeName: string = '';
  public promoDescription: string = '';

  ngOnInit(): void {
    if (this.quoteState.school > 0) {
      this.schoolService
        .getSchoolById(this.quoteState.school)
        .subscribe((item) => (this.schoolName = item.name));
    }

    if (this.quoteState.schoolGrade > 0) {
      this.gradeService
        .getGradeById(this.quoteState.schoolGrade)
        .subscribe((item) => (this.gradeName = item.name));
    }

    if (this.quoteState.promotionType > 0) {
      this.promoService
        .getPromotionById(this.quoteState.promotionType)
        .subscribe((item) => (this.promoDescription = item.description));
    }
  }

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

    this._quoteService
      .createQuotation({ ...header }, items)
      .then((_) => {
        this._router.navigateByUrl('/');
      })
      .catch((err) => console.error(err));
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationStateService } from '@app/quotes/services/quotation-state.service';
import { QuotationService } from '@app/quotes/services/quotation.service';
import { QuoteMutation } from '@app/quotes/models/quotation';
import { SchoolService } from '@app/quotes/services/school.service';
import { SchoolGradeService } from '@app/quotes/services/school-grade.service';
import { PromotionTypeService } from '@app/quotes/services/promotion-type.service';
import { Router } from '@angular/router';
import { combineLatestWith } from 'rxjs';

@Component({
  selector: 'app-quote-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-confirmation.component.html',
  styles: `
    .quote-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 38px;
    }

    .total-label {
      font-size: 18px;
    }
  `,
})
export class QuoteConfirmationComponent implements OnInit {
  private readonly _stateService = inject(QuotationStateService);
  private readonly _quoteService = inject(QuotationService);
  private readonly _router = inject(Router);
  private readonly schoolService = inject(SchoolService);
  private readonly gradeService = inject(SchoolGradeService);
  private readonly promoService = inject(PromotionTypeService);
  public readonly quoteState = this._stateService.quoteState;
  public schoolName: string = '';
  public gradeName: string = '';
  public promoDescription: string = '';

  ngOnInit(): void {
    const { school, schoolGrade, promotionType } = this.quoteState();

    this.schoolService
      .getSchoolById(school)
      .pipe(
        combineLatestWith(
          this.gradeService.getGradeById(schoolGrade),
          this.promoService.getPromotionById(promotionType),
        ),
      )
      .subscribe(([school, schoolGrade, promotionType]) => {
        this.schoolName = school.name;
        this.gradeName = schoolGrade.name;
        this.promoDescription = promotionType.description;
      });
  }

  public onCreateQuote(): void {
    const header: QuoteMutation = {
      customerName: this.quoteState().customerName,
      studentName: this.quoteState().studentName,
      date: this.quoteState().date,
      gradeId: this.quoteState().schoolGrade,
      schoolId: this.quoteState().school,
      promotionId: this.quoteState().promotionType,
      totalAmmount: this.quoteState().total,
    };
    const items = this.quoteState().items;

    this._quoteService
      .createQuotation({ ...header }, items)
      .then((_) => {
        this._router.navigateByUrl('/quotations');
      })
      .catch((err) => console.error(err));
  }
}

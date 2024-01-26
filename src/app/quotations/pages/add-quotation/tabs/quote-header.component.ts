import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolGradeService } from '@app/schools/services/school-grade.service';
import { SchoolService } from '@app/schools/services/school.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';

@Component({
  selector: 'app-quote-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './quote-header.component.html',
  styles: ``,
})
export class QuoteHeaderComponent {
  private readonly _quoteState = inject(QuotationStateService);
  private readonly _router = inject(Router);
  public readonly _activatedRoute = inject(ActivatedRoute);
  public schools$ = inject(SchoolService).getSchools();
  public schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();

  public quoteHeaderForm = inject(QuotationStateService).quoteHeaderForm;

  public get diplayStudentControl(): boolean {
    return !this._quoteState.quoteWithDiscount();
  }

  public get denyToSubmit(): boolean {
    return !this._quoteState.quoteHeaderForm.valid;
  }

  public onBackToPrevious(): void {
    this._router.navigate(['../cart'], {
      relativeTo: this._activatedRoute,
    });
  }

  public onSubmitQuote(): void {
    this._router.navigate(['../confirmation'], {
      relativeTo: this._activatedRoute,
    });
  }
}

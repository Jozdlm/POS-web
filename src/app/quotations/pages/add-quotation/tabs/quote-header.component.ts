import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolGradeService } from '@app/schools/services/school-grade.service';
import { SchoolService } from '@app/schools/services/school.service';
import { RouterModule } from '@angular/router';
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
  public schools$ = inject(SchoolService).getSchools();
  public schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();

  public quoteHeaderForm = inject(QuotationStateService).quoteHeaderForm;

  @Output() onClickToReturn = new EventEmitter<any>();
  @Output() onClickToContinue = new EventEmitter<any>();

  public get diplayStudentControl(): boolean {
    return !this._quoteState.quoteWithDiscount();
  }

  public get denyToSubmit(): boolean {
    return !this._quoteState.quoteHeaderForm.valid;
  }

  public handleClickToReturn(): void {
    this.onClickToReturn.emit(null);
  }

  public onSubmitQuote(): void {
    this.onClickToContinue.emit(null);
  }
}

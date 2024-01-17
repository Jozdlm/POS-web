import {
  Component,
  DestroyRef,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SchoolGradeService } from '@app/schools/services/school-grade.service';
import { SchoolService } from '@app/schools/services/school.service';
import { RouterModule } from '@angular/router';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';

@Component({
  selector: 'app-quote-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './quote-header.component.html',
  styleUrl: './quote-header.component.scss',
})
export class QuoteHeaderComponent {
  private readonly _subscriptions = new Subscription();
  private readonly _quoteState = inject(QuotationStateService);
  public schools$ = inject(SchoolService).getSchools();
  public schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();
  public diplayStudentControl = false;

  public quoteHeaderForm = inject(QuotationStateService).quoteHeaderForm;

  @Output() onClickToReturn = new EventEmitter<any>();
  @Output() onClickToContinue = new EventEmitter<any>();

  public get denyToSubmit(): boolean {
    return !this._quoteState.quoteHeaderForm.valid;
  }

  constructor() {
    this.watchPromotionType();
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
    });
  }

  private watchPromotionType(): void {
    this._subscriptions.add(
      this.quoteHeaderForm.controls.promotionType.valueChanges.subscribe(
        (value) => {
          if (value * 1 === 1) {
            this._quoteState.addDiscount();
            this.diplayStudentControl = false;
          } else {
            this._quoteState.removeDiscount();
            this.diplayStudentControl = false;
          }
        },
      ),
    );
  }

  public handleClickToReturn(): void {
    this.onClickToReturn.emit(null);
  }

  public onSubmitQuote(): void {
    this.onClickToContinue.emit(null);
  }
}

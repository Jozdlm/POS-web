import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { getCurrentDate } from '@app/quotations/utils/current-date';
import { Subscription } from 'rxjs';
import { SchoolGradeService } from '@app/schools/services/school-grade.service';
import { SchoolService } from '@app/schools/services/school.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quote-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './quote-header.component.html',
  styleUrl: './quote-header.component.scss',
})
export class QuoteHeaderComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _subscriptions = new Subscription();
  public schools$ = inject(SchoolService).getSchools();
  public schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();
  public diplayStudentControl = false;

  public quotationInfo = this._fb.nonNullable.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    studentName: ['', [Validators.required, Validators.minLength(3)]],
    date: [getCurrentDate(), Validators.required],
    schoolGrade: [0, [Validators.required, Validators.min(1)]],
    school: [0, [Validators.required, Validators.min(1)]],
    promotionType: [0, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    this.watchPromotionType();
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
    });
  }

  private watchPromotionType(): void {
    this._subscriptions.add(
      this.quotationInfo.controls.promotionType.valueChanges.subscribe(
        (value) => {
          if (value * 1 === 2) {
            this.diplayStudentControl = true;
          } else {
            this.diplayStudentControl = false;
          }
        },
      ),
    );
  }

  public onSubmitQuote(): void {
    const raw = this.quotationInfo.getRawValue();
    console.log(raw);
  }
}

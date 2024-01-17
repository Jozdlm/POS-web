import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getCurrentDate } from '@app/common';

@Injectable({
  providedIn: 'root',
})
export class QuoteFormStateService {
  public quoteForm = inject(FormBuilder).nonNullable.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    studentName: ['N/A', [Validators.required, Validators.minLength(3)]],
    date: [getCurrentDate(), Validators.required],
    schoolGrade: [0, [Validators.required, Validators.min(1)]],
    school: [0, [Validators.required, Validators.min(1)]],
    promotionType: [0, [Validators.required, Validators.min(1)]],
  });
}

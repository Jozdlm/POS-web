import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SchoolGradeService } from '@app/schools/services/school-grade.service';
import { QuotationStateService } from '@app/quotations/services/quotation-state.service';
import { QuotationItem } from '@app/quotations/models/quotation-item';
import { QuotationService } from '@app/quotations/services/quotation.service';
import { SchoolService } from '@app/schools/services/school.service';
import { IconComponent } from '@app/common/components/icon.component';
import { QuoteHeaderComponent } from './quote-header/quote-header.component';
import { QuoteItemsComponent } from './quote-items/quote-items.component';

@Component({
  standalone: true,
  templateUrl: './add-quotation.component.html',
  styleUrl: './add-quotation.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IconComponent,
    QuoteHeaderComponent,
    QuoteItemsComponent,
  ],
})
export class AddQuotationComponent {
  private readonly _quotationState = inject(QuotationStateService);
  private readonly _quotationService = inject(QuotationService);
  private _subscriptions = new Subscription();
  public readonly schools$ = inject(SchoolService).getSchools();
  public readonly schoolGrades$ = inject(SchoolGradeService).getSchoolGrades();

  public quoteState$ = this._quotationState.quoteState$;
  private _promotionState = new BehaviorSubject<boolean>(false);
  public readonly displayStudentControl = this._promotionState.asObservable();

  public tabItems: string[] = [
    '1. Carrito',
    '2. Datos del cliente',
    '3. Confirmación',
  ];
  public currentTab: string = this.tabItems[0];

  public setCurrentTab(tab: string): void {
    this.currentTab = tab;
  }

  public getActiveTabClassName(tabName: string): string {
    return this.currentTab == tabName ? 'btn-primary' : '';
  }

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this._subscriptions.unsubscribe();
      this._quotationState.clearQuotationState();
    });
  }

  public createQuotation(): void {
    // const raw = this.quotationInfo.getRawValue();
    const snapshot = this._quotationState.getStateSnapshot();

    // const quote: QuoteMutation = {
    //   customerName: raw.customerName,
    //   studentName: raw.studentName,
    //   date: raw.date,
    //   gradeId: raw.schoolGrade,
    //   schoolId: raw.school,
    //   totalAmmount: snapshot.totalAmmount,
    //   promotionId: raw.promotionType,
    // };
    const items: QuotationItem[] = snapshot.items;

    // this._quotationService.createQuotation(quote, items);
  }
}
